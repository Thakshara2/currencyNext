"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeftRight, Sun, Moon } from "lucide-react";
import CurrencyInput from "@/components/currency-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getExchangeRate } from "@/services/exchange-rate";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [rate, setRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConversion = async () => {
    try {
      setIsLoading(true);
      const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;
      const data = await getExchangeRate(fromCurrency, toCurrency, numericAmount);
      
      setConvertedAmount(data.conversion_result.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }));
      setRate(data.conversion_rate);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Conversion error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const debouncedConversion = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    
    const convert = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleConversion();
      }, 500);
    };

    convert();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fromCurrency, toCurrency, amount]);

  useEffect(() => {
    if (amount) {
      const cleanup = debouncedConversion();
      return cleanup;
    }
  }, [amount, debouncedConversion]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/90 p-4 md:p-8 flex items-center justify-center relative transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-emerald-100/30 dark:bg-emerald-900/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-green-100/30 dark:bg-green-900/5 rounded-full blur-3xl" />
      </div>

      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 rounded-full border border-emerald-200/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow-lg hover:bg-emerald-50 dark:hover:bg-slate-800/50"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-5 w-5 text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-5 w-5 text-slate-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mx-auto relative z-10"
      >
        <motion.div 
          variants={itemVariants} 
          className="text-center mb-12 space-y-4"
        >
          <div className="relative">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 tracking-tight leading-none py-3">
              Currency Converter
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-green-600/10 to-teal-600/10 dark:from-emerald-400/5 dark:via-green-400/5 dark:to-teal-400/5 blur-3xl -z-10" />
          </div>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-semibold max-w-2xl mx-auto">
            Real-time exchange rates at your fingertips
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/80 border border-emerald-100 dark:border-slate-800 shadow-xl shadow-emerald-100/20 dark:shadow-slate-900/10">
            <CardContent className="p-8 md:p-10">
              <div className="grid grid-cols-[1fr,auto,1fr] gap-6 md:gap-8 items-center">
                <CurrencyInput
                  label="Amount"
                  value={amount}
                  currency={fromCurrency}
                  onValueChange={setAmount}
                  onCurrencyChange={setFromCurrency}
                />

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-8"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwapCurrencies}
                    className="rounded-full hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all duration-200"
                  >
                    <ArrowLeftRight className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  </Button>
                </motion.div>

                <CurrencyInput
                  label="Converted to"
                  value={convertedAmount}
                  currency={toCurrency}
                  onValueChange={setConvertedAmount}
                  onCurrencyChange={setToCurrency}
                  readonly
                />
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <AnimatePresence mode="wait">
                  {rate && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 via-green-100 to-teal-100 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-teal-900/30 text-emerald-800 dark:text-emerald-300 font-medium backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
                        1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                      </div>
                      {lastUpdated && (
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          Last updated: {lastUpdated}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
}
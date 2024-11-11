"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Most commonly used currencies first, followed by all others alphabetically
const currencies = [
  // Major World Currencies
  { code: "USD", name: "US Dollar", countryCode: "us" },
  { code: "EUR", name: "Euro", countryCode: "eu" },
  { code: "JPY", name: "Japanese Yen", countryCode: "jp" },
  { code: "GBP", name: "British Pound", countryCode: "gb" },
  { code: "CNY", name: "Chinese Renminbi", countryCode: "cn" },
  { code: "AUD", name: "Australian Dollar", countryCode: "au" },
  { code: "CAD", name: "Canadian Dollar", countryCode: "ca" },
  { code: "CHF", name: "Swiss Franc", countryCode: "ch" },
  { code: "HKD", name: "Hong Kong Dollar", countryCode: "hk" },
  { code: "SGD", name: "Singapore Dollar", countryCode: "sg" },
  
  // Secondary Major Currencies
  { code: "INR", name: "Indian Rupee", countryCode: "in" },
  { code: "RUB", name: "Russian Ruble", countryCode: "ru" },
  { code: "NZD", name: "New Zealand Dollar", countryCode: "nz" },
  { code: "MXN", name: "Mexican Peso", countryCode: "mx" },
  { code: "BRL", name: "Brazilian Real", countryCode: "br" },
  { code: "ZAR", name: "South African Rand", countryCode: "za" },
  { code: "KRW", name: "South Korean Won", countryCode: "kr" },
  { code: "TWD", name: "New Taiwan Dollar", countryCode: "tw" },
  { code: "SEK", name: "Swedish Krona", countryCode: "se" },
  { code: "NOK", name: "Norwegian Krone", countryCode: "no" },

  // Rest of the currencies in alphabetical order
  { code: "AED", name: "UAE Dirham", countryCode: "ae" },
  { code: "AFN", name: "Afghan Afghani", countryCode: "af" },
  { code: "ALL", name: "Albanian Lek", countryCode: "al" },
  { code: "AMD", name: "Armenian Dram", countryCode: "am" },
  { code: "ANG", name: "Netherlands Antillian Guilder", countryCode: "cw" },
  { code: "AOA", name: "Angolan Kwanza", countryCode: "ao" },
  { code: "ARS", name: "Argentine Peso", countryCode: "ar" },
  { code: "AWG", name: "Aruban Florin", countryCode: "aw" },
  { code: "AZN", name: "Azerbaijani Manat", countryCode: "az" },
  { code: "BAM", name: "Bosnia and Herzegovina Mark", countryCode: "ba" },
  { code: "BBD", name: "Barbados Dollar", countryCode: "bb" },
  { code: "BDT", name: "Bangladeshi Taka", countryCode: "bd" },
  { code: "BGN", name: "Bulgarian Lev", countryCode: "bg" },
  { code: "BHD", name: "Bahraini Dinar", countryCode: "bh" },
  { code: "BIF", name: "Burundian Franc", countryCode: "bi" },
  { code: "BMD", name: "Bermudian Dollar", countryCode: "bm" },
  { code: "BND", name: "Brunei Dollar", countryCode: "bn" },
  { code: "BOB", name: "Bolivian Boliviano", countryCode: "bo" },
  { code: "BSD", name: "Bahamian Dollar", countryCode: "bs" },
  { code: "BTN", name: "Bhutanese Ngultrum", countryCode: "bt" },
  { code: "BWP", name: "Botswana Pula", countryCode: "bw" },
  { code: "BYN", name: "Belarusian Ruble", countryCode: "by" },
  { code: "BZD", name: "Belize Dollar", countryCode: "bz" },
  { code: "CDF", name: "Congolese Franc", countryCode: "cd" },
  { code: "CLP", name: "Chilean Peso", countryCode: "cl" },
  { code: "COP", name: "Colombian Peso", countryCode: "co" },
  { code: "CRC", name: "Costa Rican Colon", countryCode: "cr" },
  { code: "CUP", name: "Cuban Peso", countryCode: "cu" },
  { code: "CVE", name: "Cape Verdean Escudo", countryCode: "cv" },
  { code: "CZK", name: "Czech Koruna", countryCode: "cz" },
  { code: "DJF", name: "Djiboutian Franc", countryCode: "dj" },
  { code: "DKK", name: "Danish Krone", countryCode: "dk" },
  { code: "DOP", name: "Dominican Peso", countryCode: "do" },
  { code: "DZD", name: "Algerian Dinar", countryCode: "dz" },
  { code: "EGP", name: "Egyptian Pound", countryCode: "eg" },
  { code: "ERN", name: "Eritrean Nakfa", countryCode: "er" },
  { code: "ETB", name: "Ethiopian Birr", countryCode: "et" },
  { code: "FJD", name: "Fiji Dollar", countryCode: "fj" },
  { code: "FKP", name: "Falkland Islands Pound", countryCode: "fk" },
  { code: "FOK", name: "Faroese Króna", countryCode: "fo" },
  { code: "GEL", name: "Georgian Lari", countryCode: "ge" },
  { code: "GGP", name: "Guernsey Pound", countryCode: "gg" },
  { code: "GHS", name: "Ghanaian Cedi", countryCode: "gh" },
  { code: "GIP", name: "Gibraltar Pound", countryCode: "gi" },
  { code: "GMD", name: "Gambian Dalasi", countryCode: "gm" },
  { code: "GNF", name: "Guinean Franc", countryCode: "gn" },
  { code: "GTQ", name: "Guatemalan Quetzal", countryCode: "gt" },
  { code: "GYD", name: "Guyanese Dollar", countryCode: "gy" },
  { code: "HNL", name: "Honduran Lempira", countryCode: "hn" },
  { code: "HRK", name: "Croatian Kuna", countryCode: "hr" },
  { code: "HTG", name: "Haitian Gourde", countryCode: "ht" },
  { code: "HUF", name: "Hungarian Forint", countryCode: "hu" },
  { code: "IDR", name: "Indonesian Rupiah", countryCode: "id" },
  { code: "ILS", name: "Israeli New Shekel", countryCode: "il" },
  { code: "IMP", name: "Manx Pound", countryCode: "im" },
  { code: "IQD", name: "Iraqi Dinar", countryCode: "iq" },
  { code: "IRR", name: "Iranian Rial", countryCode: "ir" },
  { code: "ISK", name: "Icelandic Króna", countryCode: "is" },
  { code: "JEP", name: "Jersey Pound", countryCode: "je" },
  { code: "JMD", name: "Jamaican Dollar", countryCode: "jm" },
  { code: "JOD", name: "Jordanian Dinar", countryCode: "jo" },
  { code: "KES", name: "Kenyan Shilling", countryCode: "ke" },
  { code: "KGS", name: "Kyrgyzstani Som", countryCode: "kg" },
  { code: "KHR", name: "Cambodian Riel", countryCode: "kh" },
  { code: "KID", name: "Kiribati Dollar", countryCode: "ki" },
  { code: "KMF", name: "Comorian Franc", countryCode: "km" },
  { code: "KWD", name: "Kuwaiti Dinar", countryCode: "kw" },
  { code: "KYD", name: "Cayman Islands Dollar", countryCode: "ky" },
  { code: "KZT", name: "Kazakhstani Tenge", countryCode: "kz" },
  { code: "LAK", name: "Lao Kip", countryCode: "la" },
  { code: "LBP", name: "Lebanese Pound", countryCode: "lb" },
  { code: "LKR", name: "Sri Lankan Rupee", countryCode: "lk" },
  { code: "LRD", name: "Liberian Dollar", countryCode: "lr" },
  { code: "LSL", name: "Lesotho Loti", countryCode: "ls" },
  { code: "LYD", name: "Libyan Dinar", countryCode: "ly" },
  { code: "MAD", name: "Moroccan Dirham", countryCode: "ma" },
  { code: "MDL", name: "Moldovan Leu", countryCode: "md" },
  { code: "MGA", name: "Malagasy Ariary", countryCode: "mg" },
  { code: "MKD", name: "Macedonian Denar", countryCode: "mk" },
  { code: "MMK", name: "Burmese Kyat", countryCode: "mm" },
  { code: "MNT", name: "Mongolian Tögrög", countryCode: "mn" },
  { code: "MOP", name: "Macanese Pataca", countryCode: "mo" },
  { code: "MRU", name: "Mauritanian Ouguiya", countryCode: "mr" },
  { code: "MUR", name: "Mauritian Rupee", countryCode: "mu" },
  { code: "MVR", name: "Maldivian Rufiyaa", countryCode: "mv" },
  { code: "MWK", name: "Malawian Kwacha", countryCode: "mw" },
  { code: "MYR", name: "Malaysian Ringgit", countryCode: "my" },
  { code: "MZN", name: "Mozambican Metical", countryCode: "mz" },
  { code: "NAD", name: "Namibian Dollar", countryCode: "na" },
  { code: "NGN", name: "Nigerian Naira", countryCode: "ng" },
  { code: "NIO", name: "Nicaraguan Córdoba", countryCode: "ni" },
  { code: "NPR", name: "Nepalese Rupee", countryCode: "np" },
  { code: "OMR", name: "Omani Rial", countryCode: "om" },
  { code: "PAB", name: "Panamanian Balboa", countryCode: "pa" },
  { code: "PEN", name: "Peruvian Sol", countryCode: "pe" },
  { code: "PGK", name: "Papua New Guinean Kina", countryCode: "pg" },
  { code: "PHP", name: "Philippine Peso", countryCode: "ph" },
  { code: "PKR", name: "Pakistani Rupee", countryCode: "pk" },
  { code: "PLN", name: "Polish Złoty", countryCode: "pl" },
  { code: "PYG", name: "Paraguayan Guaraní", countryCode: "py" },
  { code: "QAR", name: "Qatari Riyal", countryCode: "qa" },
  { code: "RON", name: "Romanian Leu", countryCode: "ro" },
  { code: "RSD", name: "Serbian Dinar", countryCode: "rs" },
  { code: "RWF", name: "Rwandan Franc", countryCode: "rw" },
  { code: "SAR", name: "Saudi Riyal", countryCode: "sa" },
  { code: "SBD", name: "Solomon Islands Dollar", countryCode: "sb" },
  { code: "SCR", name: "Seychellois Rupee", countryCode: "sc" },
  { code: "SDG", name: "Sudanese Pound", countryCode: "sd" },
  { code: "SHP", name: "Saint Helena Pound", countryCode: "sh" },
  { code: "SLE", name: "Sierra Leonean Leone", countryCode: "sl" },
  { code: "SOS", name: "Somali Shilling", countryCode: "so" },
  { code: "SRD", name: "Surinamese Dollar", countryCode: "sr" },
  { code: "SSP", name: "South Sudanese Pound", countryCode: "ss" },
  { code: "STN", name: "São Tomé and Príncipe Dobra", countryCode: "st" },
  { code: "SYP", name: "Syrian Pound", countryCode: "sy" },
  { code: "SZL", name: "Eswatini Lilangeni", countryCode: "sz" },
  { code: "THB", name: "Thai Baht", countryCode: "th" },
  { code: "TJS", name: "Tajikistani Somoni", countryCode: "tj" },
  { code: "TMT", name: "Turkmenistan Manat", countryCode: "tm" },
  { code: "TND", name: "Tunisian Dinar", countryCode: "tn" },
  { code: "TOP", name: "Tongan Paʻanga", countryCode: "to" },
  { code: "TRY", name: "Turkish Lira", countryCode: "tr" },
  { code: "TTD", name: "Trinidad and Tobago Dollar", countryCode: "tt" },
  { code: "TVD", name: "Tuvaluan Dollar", countryCode: "tv" },
  { code: "TZS", name: "Tanzanian Shilling", countryCode: "tz" },
  { code: "UAH", name: "Ukrainian Hryvnia", countryCode: "ua" },
  { code: "UGX", name: "Ugandan Shilling", countryCode: "ug" },
  { code: "UYU", name: "Uruguayan Peso", countryCode: "uy" },
  { code: "UZS", name: "Uzbekistani So'm", countryCode: "uz" },
  { code: "VES", name: "Venezuelan Bolívar Soberano", countryCode: "ve" },
  { code: "VND", name: "Vietnamese Đồng", countryCode: "vn" },
  { code: "VUV", name: "Vanuatu Vatu", countryCode: "vu" },
  { code: "WST", name: "Samoan Tālā", countryCode: "ws" },
  { code: "XAF", name: "Central African CFA Franc", countryCode: "cm" },
  { code: "XCD", name: "East Caribbean Dollar", countryCode: "ag" },
  { code: "XDR", name: "Special Drawing Rights", countryCode: "un" },
  { code: "XOF", name: "West African CFA Franc", countryCode: "sn" },
  { code: "XPF", name: "CFP Franc", countryCode: "pf" },
  { code: "YER", name: "Yemeni Rial", countryCode: "ye" },
  { code: "ZMW", name: "Zambian Kwacha", countryCode: "zm" },
  { code: "ZWL", name: "Zimbabwean Dollar", countryCode: "zw" }
];

interface CurrencyInputProps {
  label: string;
  value: string;
  currency: string;
  onValueChange: (value: string) => void;
  onCurrencyChange: (currency: string) => void;
  readonly?: boolean;
}

export default function CurrencyInput({
  label,
  value,
  currency,
  onValueChange,
  onCurrencyChange,
  readonly = false,
}: CurrencyInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="h-14 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl text-lg pl-4 pr-24 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all"
          placeholder="0"
          readOnly={readonly}
        />
        <div className="absolute right-0 top-0 h-full">
          <Select value={currency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="h-full border-0 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors px-3 w-[100px] focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              {currencies.map((curr) => (
                <SelectItem
                  key={curr.code}
                  value={curr.code}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <span className="flex items-center gap-2">
                    <img 
                      src={`https://flagcdn.com/24x18/${curr.countryCode}.png`}
                      srcSet={`https://flagcdn.com/48x36/${curr.countryCode}.png 2x`}
                      width="24"
                      height="18"
                      alt={curr.name}
                      className="rounded-[1px] object-cover"
                      loading="lazy"
                    />
                    <span className="font-medium">{curr.code}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
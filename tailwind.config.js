const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: process.env.TAILWIND_MODE ? "jit" : "",
  content: ["./src/**/*.{ts,html,scss}"],
  plugins: [
    require('tw-elements/dist/plugin')
  ],
  theme: {
    extend: {},
    spacing: {
      px: '1px',
      '0': '0px',
      '0.25': '0.0625rem', // 1px
      '0.5': '0.125rem', // 2px
      '0.75': '0.1875rem', // 3px
      '1': '0.25rem', // 4px
      '1.25': '0.3125rem', // 5px
      '1.5': '0.375rem', // 6px
      '1.75': '0.4375rem', // 7px
      '2': '0.5rem', // 8px
      '2.25': '0.5625rem', // 9px
      '2.5': '0.625rem', // 10px
      '2.64': '0.66rem', // 10.56px
      '2.75': '0.6875rem', // 11px
      '3': '0.75rem', // 12px
      '3.25': '0.8125rem', // 13px
      '3.5': '0.875rem', // 14px
      '3.75': '0.9375rem', // 15px
      '4': '1rem', // 16px
      '4.25': '1.0625rem', // 15px
      '4.5': '1.125rem', // 18px
      '4.75': '1.1875rem', // 19px
      '5': '1.25rem', // 20px
      '5.25': '1.3125rem', // 20px
      '5.5': '1.375rem', // 22px
      '5.75': '1.4375rem', // 23px
      '6': '1.5rem', // 24px
      '6.25': '1.5625rem', //25px
      '6.5': '1.625rem', // 26px
      '6.75': '1.6875rem', // 27px
      '7': '1.75rem', // 28px
      '7.5': '1.875rem', // 30px
      '8': '2rem', // 32px
      '8.25': '2.0625rem', // 33px
      '8.5': '2.125rem', // 34px
      '8.75': '2.1875rem', // 35px
      '9': '2.25rem', // 36px
      '9.25': '2.3125rem', // 36px
      '9.5': '2.375rem', // 38px
      '10': '2.5rem', // 40px
      '10.5': '2.6875rem', // 43px
      '11': '2.75rem', // 44px
      '11.5': '2.875rem', // 46px
      '11.75': '2.9375rem', // 47px
      '12': '3rem', // 48px
      '12.5': '3.125rem', // 50px
      '13.75': '3.4625rem', // 55px
      '14': '3.5rem', // 56px
      '14.25': '3.5625rem', // 57px
      '14.5': '3.625rem', // 58px
      '14.75': '3.6875rem', // 59px
      '15': '3.75rem', // 60px
      '15.25': '3.8125rem', // 61px
      '16': '4rem', // 64px
      '16.25': '4.0625rem', // 65px
      '16.5': '4.125rem', // 66px
      '17': '4.25rem', // 68px
      '17.5': '4.375rem', // 70px
      '18': '4.5rem', // 72px
      '19': '4.75rem', // 76px
      '19.25': '4.8125rem', // 77px
      '19.5': '4.875rem', // 78px
      '19.75': '4.9375rem', // 79px
      '20': '5rem', // 80px
      '21': '5.25rem', // 84px
      '21.75': '5.4375rem', // 87px
      '22': '5.5rem', // 88px
      '23.5': '5.875rem', // 94px
      '24': '6rem', // 96px
      '25': '6.25rem', // 100px
      '26': '6.5rem', // 104px
      '27': '6.75rem', // 108px
      '27.5': '6.875rem', // 110px
      '28.88': '7.22rem', // 115.52px
      '29.75': '7.4375rem', // 119px
      '30': '7.5rem', // 120px
      '32': '8rem', // 128px
      '33.5': '8.375rem', // 134px
      '34': '8.5rem', // 136px
      '35.5': '8.875rem', // 144px
      '36': '9rem', // 144px
      '36.5': '9.125rem', // 146px
      '37.25': '9.3125rem', // 149px
      '37.5': '9.375rem', // 150px
      '38': '9.5rem', // 152px
      '38.25': '9.5625rem', // 153px
      '39.5': '9.875rem', // 158px
      '40': '10rem', // 160px
      '40.25': '10.0625rem', // 161px
      '40.75': '10.1875rem', // 163px
      '43': '10.75rem', // 172px
      '43.5': '10.875rem', // 174px
      '45': '11.25rem', // 180px
      '45.5': '11.375rem', // 182px
      '46': '11.5rem', // 184px
      '46.25': '11.5625rem', // 185px
      '46.5': '11.625rem', // 186px
      '47': '11.75rem', // 188px
      '50': '12.5rem', // 200px
      '52': '13rem', // 208px
      '52.5': '13.125rem', // 210px
      '56.75': '14.1875rem', // 227px
      '61': '15rem', // 248px
      '62': '15.5rem', // 248px
      '67.5': '16.875rem', // 270px
      '70': '17.5', //280px
      '71': '17.75rem', // 284px
      '71.5': '17.875rem', // 286px
      '72': '18rem', // 288px
      '74': '18.5rem', // 296px
      '74.5': '18.625rem', // 298px
      '78': '19.5rem', // 312px
      '81.25': '20.3125rem', //325px
      '85': '21.25rem', //340px
      '87.5': '21.875rem', // 350px
      '80': '20rem', // 320px
      '90': '22.5rem', //360px
      '98': '24.5rem', // 392px
      '102.25': '25.5625rem', // 409px
      '108.5': '27.125rem', // 434px
      '110': '27.5rem', // 440px
      '121.25': '30.3125rem', // 485px
      '124': '31rem', // 496px
      '125': '31.25rem', //500px
      '130': '32.5rem', // 520px
      '140': '35rem', // 560px
      '148.25': '37.0625rem', // 593px
      '150': '37.5rem', // 600px
      '153.5': '38.375rem', // 614px
      '155.5': '38.875rem', // 622px
      '164': '41rem', // 656px
      '166': '41.5rem', // 664px
      '254': '63.5rem', // 1016px,
      '1/2': '50%',
      '1/2-screen': '50vh',
      '1/3-screen': '33.333333vh',
      '2/3-screen': '66.666667vh',
      '1/4-screen': '25vh',
      '2/4-screen': '50vh',
      '3/4-screen': '75vh',
    },
    fontFamily: {
      ...fontFamily,
      "poppins": ["Poppins", "san-serif"]
    },
    colors: {
      ...colors,
      "btn-primary-dark": "var(--btn-primary-dark)",
      "btn-primary-cold": "var(--btn-primary-cold)",
      "btn-secondary-dark": "var(--btn-secondary-dark)",
      "btn-secondary-light": "var(--btn-secondary-light)",
      "btn-danger": "var(--btn-danger)",
      "btn-success": "var(--btn-success)",
      "primary-dark": "var(--primary-dark)",
      "primary-light": "var(--primary-light)",
      "primary-cold": "var(--primary-cold)",
      "secondary-dark": "var(--secondary-dark)",
      "secondary-light": "var(--secondary-light)",
    }
  },
  plugins: [],
}

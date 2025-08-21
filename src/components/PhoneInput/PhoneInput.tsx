// // import { useState } from "react";
// // import { InputMask, useMask } from "@react-input/mask";

// // export default function PhoneInput() {
// //   const [value, setValue] = useState("");

// //   const maskSettings: Record<string, string> = {
// //     plus: "+7",
// //     empty: "__",
// //   };

// //   const modify = (inputValue: string) => {

// //     if (inputValue.startsWith('+')){
// //       const digits = inputValue.replace(/\d/, '')
// //       return { mask: `${maskSettings.plus} ${digits.slice(2, 5)} ___-__-__` };
// //     }

// //     if (
// //       inputValue &&
// //       (inputValue.startsWith("7") || inputValue.startsWith("8"))
// //     ) {
// //       return { mask: `${maskSettings.base}_ ___ ___-__-__` };
// //     }

// //     if (
// //       inputValue &&
// //       (inputValue.startsWith("+7") || inputValue.startsWith("+8"))
// //     ) {
// //       return { mask: `${maskSettings.empty} ___ ___-__-__` };
// //     }

// //     // Возвращаем только цифры (маска работает с цифрами)
// //     // return {mask: ''};
// //   };

// //   const inputRef = useMask({
// //     mask: "__ ___ ___-__-__",
// //     replacement: { _: /[\d+]/ },
// //     modify: modify,
// //   });

// //   return <input type="tel" ref={inputRef} placeholder="+7 000 000-00-00" />;
// // }

// import { useState } from "react";
// import { InputMask, useMask, type Modify, type Track } from "@react-input/mask";
// import RenderFromTemplateContext from "next/dist/client/components/render-from-template-context";

// export default function PhoneInput() {
//   const [value, setValue] = useState("");

//   const track: Track = ({ inputType, value, data, selectionStart, selectionEnd }) => {
//     if (inputType === 'insert' && !/^\D*1/.test(data) && selectionStart <= 1) {
//       return `1${data}`;
//     }

//     if (inputType !== 'insert' && selectionStart <= 1 && selectionEnd < value.length) {
//       if (selectionEnd > 2) {
//         return '1';
//       }
//       if (selectionEnd === 2) {
//         return false;
//       }
//     }

//     return data;
//   };

//   // const modify = (inputValue: string) => {
//   //   // Если ввод начинается с "+7" или "+8", оставляем как есть
//   //   if (inputValue.startsWith("+7") || inputValue.startsWith("+8")) {
//   //     return { mask: "+7 ___ ___-__-__", replacement: {
//   //       '+7 7': '+7'
//   //     } };
//   //   }

//   //   // Если ввод начинается с "7" или "8", добавляем "+"
//   //   if (inputValue.startsWith("7") || inputValue.startsWith("8")) {
//   //     return { mask: "+7 ___ ___-__-__", replacement: {
//   //       '+7 7': '+7'
//   //     }};
//   //   }

//     // Если ввод начинается с "+" (но не с +7/+8), исправляем на +7
//     // if (
//     //   inputValue.startsWith("+") &&
//     //   !inputValue.startsWith("+7") &&
//     //   !inputValue.startsWith("+8")
//     // ) {
//     //   return { mask: "+7 ___ ___-__-__", value: "+7" + inputValue.slice(1), separate: true };
//     // }

//     // Если ввод начинается с любой другой цифры (не 7, не 8), добавляем +7
//   //   if (
//   //     /^\d/.test(inputValue) &&
//   //     !inputValue.startsWith("7") &&
//   //     !inputValue.startsWith("8")
//   //   ) {
//   //     return { mask: "+7 ___ ___-__-__", value: "+7" + inputValue };
//   //   }

//   //   // Если ввод пустой или не начинается с цифры/плюса
//   //   return { mask: "+7 ___ ___-__-__" };
//   // };

//   const inputRef = useMask({
//     mask: "+7 ___ ___-__-__",
//     replacement: { _: /[0-9]/ },
//     // separate: true,
//     // modify: modify,
//     track: track
//   });

//   return <input type="tel" ref={inputRef} placeholder="+7 000 000-00-00" />;
// }





// import { InputMask, type Track } from '@react-input/mask';

// export default function App() {
//   const track: Track = ({ inputType, value, data, selectionStart, selectionEnd }) => {

//     if (inputType === 'insert' && data.startsWith('+') && selectionStart <= 1) {
//       return `+7 ${value}`;
//     }

//     if (inputType === 'insert' && (data.startsWith('7') || data.startsWith('8')) && selectionStart <= 1) {
//       return `+${data}`;
//     }

//     if (inputType === 'insert' && (data.startsWith('+7') || data.startsWith('+8')) && selectionStart <= 1) {
//       return `${data}`;
//     }

//     if (inputType !== 'insert' && selectionStart <= 1 && selectionEnd < value.length) {
//       if (selectionEnd > 2) {
//         return '1';
//       }
//       if (selectionEnd === 2) {
//         return false;
//       }
//     }

//     return data;
//   };

//   return <InputMask mask="__ ___ ___-__-__" replacement={{ _: /^[\d+]+$/ }} track={track} placeholder='+7 000 000-00-00'/>;
// }




import { InputMask, type Track } from '@react-input/mask';

export default function App() {
  const track: Track = ({ inputType, value, data, selectionStart, selectionEnd }) => {
    // Обрабатываем только вставку данных
    if (inputType === 'insert') {
      // Если вставляется плюс в начало
      if (data === '+' && selectionStart === 0) {
        return '+7';
      }
      
      // Если вставляется цифра в начало
      if (/^\d$/.test(data) && selectionStart === 0) {
        if (data === '7' || data === '8') {
          return '+7';
        } else {
          return '+7' + data;
        }
      }
      
      // Если вставляется плюс с цифрами
      if (data.startsWith('+') && selectionStart === 0) {
        const digits = data.replace(/\D/g, '');
        if (digits.startsWith('7') || digits.startsWith('8')) {
          return '+7' + digits.substring(1);
        } else {
          return '+7' + digits;
        }
      }
    }
    
    return data;
  };

  return (
    <InputMask 
      mask="+_ ___ ___-__-__" 
      replacement={{ _: /\d/ }} 
      track={track} 
      placeholder='+7 000 000-00-00'
      type='tel'
      autoComplete="tel"
    />
  );
}
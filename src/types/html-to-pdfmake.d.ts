declare module 'html-to-pdfmake' {
  interface HtmlToPdfmakeOptions {
    window?: any;
    tableAutoSize?: boolean;
    imagesByReference?: boolean;
  }
  
  function htmlToPdfmake(htmlText: string, options?: HtmlToPdfmakeOptions): any;
  export default htmlToPdfmake;
} 
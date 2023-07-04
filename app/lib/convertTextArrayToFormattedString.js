const convertTextArrayToFormattedString = (textBlockArray) => {
  // Create an empty string
  let formattedParagraphs = "";

  // Go through the items in the textBlockArray and add them to the big string with line spacers at the end
  textBlockArray.forEach((arrayItem) => {
    formattedParagraphs = formattedParagraphs + arrayItem + "\n\n";
  });

  return formattedParagraphs;
};

export default convertTextArrayToFormattedString;

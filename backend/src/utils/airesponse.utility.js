export function extractSections(text) {
  const thinkRegex = /<think>([\s\S]*?)<\/think>/; // Regex to capture content inside <think> tags
  const thinkMatch = text.match(thinkRegex);

  const thinkContent = thinkMatch ? thinkMatch[1].trim() : ""; // Extract <think> content
  const responseContent = text.replace(thinkRegex, "").trim(); // Remove <think> section to get the response

  return { thinkContent, responseContent };
}

// Example Input
// const inputText = `<think>
// Okay, the user wants me to provide a response that's clear, structured, and direct...
// </think>

// **How to Improve Time Management Skills**

// 1. **Set Clear Goals**
//    - Define short-term and long-term objectives.
//    - Use the **SMART criteria** (Specific, Measurable, Achievable, Relevant, Time-bound).
// `;

// const { thinkContent, responseContent } = extractSections(inputText);

// console.log("THINK SECTION:", thinkContent);
// console.log("RESPONSE SECTION:", responseContent);

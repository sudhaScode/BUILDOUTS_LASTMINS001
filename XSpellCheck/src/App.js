import React, { useState } from "react";

const customDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example",
};
function App() {
  const [state, setState] = useState({
    inputText: "",
    suggestedText: "",
  });

  const handleInputChange = (e) => {
    const text = e.target.value;
    setState((prev) => ({ ...prev, inputText: text }));

    // Implement a basic spelling check and correction
    const words = text.split(" ");
    const correctedWords = words.map((word) => {
      const correctedWord = customDictionary[word.toLowerCase()];
      return correctedWord || word;
    });

    const correctedText = correctedWords.join(" ");

    // Set the suggested text (first corrected word)
    const firstCorrection = correctedWords.find(
      (word, index) => word !== words[index]
    );
    setState((prev) => ({ ...prev, suggestedText: firstCorrection || "" }));
  };
  return (
    <div className="App">
      <h1>Spell Check and Auto-Correction</h1>
      <textarea
        value={state.inputText}
        onChange={handleInputChange}
        placeholder="Enter text..."
        rows={5}
        cols={40}
      />
      {state.suggestedText && (
        <p>
          Did you mean: <strong>{state.suggestedText}</strong>?
        </p>
      )}
    </div>
  );
}
export default App;

import { useEffect, useRef } from "react";

/**
 * Custom hook to detect a paste operation (Cmd+V or Ctrl+V) and execute a callback function.
 * @param {Function} onPaste - The function to execute when a paste operation is detected.
 */
function usePaste(onPaste: () => void) {
  const onPasteRef = useRef(onPaste);
  onPasteRef.current = onPaste;
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the paste keys are pressed: Cmd+V on Mac or Ctrl+V on Windows/Linux
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isPaste =
        (isMac && event.metaKey && event.key === "v") ||
        (!isMac && event.ctrlKey && event.key === "v");

      if (isPaste) {
        // Execute the callback function if the paste operation is detected
        onPasteRef.current();

        // Optionally, prevent the default paste behavior
        // event.preventDefault();
      }
    };

    // Attach the event listener to the window
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null; // This hook does not render anything
}

export default usePaste;

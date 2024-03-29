const Grade = (score: number) => {
  const roundedScore = Math.round(score);

  const gradeDivs: { [key: number]: () => JSX.Element } = {
    0: () => (
      <div>
        <h1>Grade: F</h1>
        <p>Needs improvement</p>
      </div>
    ),
    2: () => (
      <div>
        <h1>Grade: D</h1>
        <p>Below average</p>
      </div>
    ),
    // Continue for grades 3 through 6
    7: () => (
      <div>
        <h1>Grade: A</h1>
        <p>Excellent</p>
      </div>
    ),
  };

  // Function to get the grade div based on score
  // Fallback to a default div if no matching score
  const getGradeDiv = (score: number) => {
    return gradeDivs[score] ? gradeDivs[score]() : <div>Invalid Score</div>;
  };

  return getGradeDiv(roundedScore);
};

export default Grade;

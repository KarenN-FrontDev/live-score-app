export const getMatches = async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/spinbet/fe-interview-test/master/data/sports.json",
    );

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    throw error;
  }
};

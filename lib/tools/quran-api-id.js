import fetch from "node-fetch";
class QuranID {
  async getData(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      throw console.error("There was a problem with the fetch operation:", error), error;
    }
  }
  async All() {
    return await this.getData("https://quran-api-id.vercel.app/surahs");
  }
  async Specific(surahNumber) {
    return await this.getData(`https://quran-api-id.vercel.app/surahs/${surahNumber}`);
  }
  async Ayahs(surahNumber) {
    return await this.getData(`https://quran-api-id.vercel.app/surahs/${surahNumber}/ayahs`);
  }
  async SpecificAyah(surahNumber, ayahNumber) {
    return await this.getData(`https://quran-api-id.vercel.app/surahs/${surahNumber}/ayahs/${ayahNumber}`);
  }
  async Random() {
    return await this.getData("https://quran-api-id.vercel.app/random");
  }
}
export {
  QuranID
};
import fetch from "node-fetch";
import cheerio from "cheerio";
class BoredHumans {
  constructor() {
    this.BASE_URL = "https://boredhumans.com/apis/boredagi_api.php";
    this.uid = {};
    this.sesh_id = {};
    this.tools = {
      image_generator: {
        num: 3,
        prompt: "Can you generate an Image?"
      },
      travel_guide: {
        num: 5,
        prompt: "Travel Guide API"
      },
      image_chat: {
        num: 6,
        prompt: "Describe this image for me."
      },
      transcription: {
        num: 8,
        prompt: "Transcribe this Audio File for me"
      },
      image_editor: {
        num: 9,
        prompt: "Edit this image for me."
      },
      celebrity_chat: {
        num: 10,
        prompt: "I want to talk to someone famous."
      },
      baby_name_generator: {
        num: 14,
        prompt: "Send some unique Baby Names"
      },
      band_name_generator: {
        num: 15,
        prompt: "Find a name for your band."
      },
      fortune_cookies: {
        num: 19,
        prompt: "Tell me my fortune"
      },
      murder_mystery: {
        num: 20,
        prompt: "I want to play Murder Mystery"
      },
      dystopia: {
        num: 23,
        prompt: "I wanna hear a dystopian story"
      },
      video_generator: {
        num: 24,
        prompt: "I want to watch a video"
      },
      pokemon_generator: {
        num: 25,
        prompt: "I want to create my own pokemon"
      },
      interior_design: {
        num: 26,
        prompt: "I want Interior Design"
      },
      code_generation: {
        num: 27,
        prompt: "Write a code for me"
      },
      crazy_images: {
        num: 28,
        prompt: "I want to see crazy images"
      },
      falling_sand: {
        num: 29,
        prompt: "I want to play with Falling Sand"
      },
      movie_musicals: {
        num: 30,
        prompt: "AI Generate Movie Musical"
      },
      ai_farts: {
        num: 33,
        prompt: "I want an AI Fart"
      },
      famous_quote_generator: {
        num: 34,
        prompt: "I want to see an AI Generated Qoute"
      },
      "ai-generated_podcasts": {
        num: 35,
        prompt: "I want to an AI Generated Podcasts"
      },
      photo_blender: {
        num: 36,
        prompt: "I want to a photo blended image"
      },
      confessions: {
        num: 37,
        prompt: "I want to see AI Generated Confessions"
      },
      new_word_generator: {
        num: 38,
        prompt: "Create a New Word using New Word Generator API"
      },
      writing_prompt_generator: {
        num: 39,
        prompt: "Generate a Writing Prompt"
      },
      faces_of_the_world: {
        num: 40,
        prompt: "Generate women faces from different parts of the world"
      },
      waifu_images: {
        num: 42,
        prompt: "Generate a waifu image"
      },
      logo_generator: {
        num: 44,
        prompt: "Generate a logo"
      },
      image_background_remover: {
        num: 45,
        prompt: "Can you remove the background of this image for me?"
      },
      lyrics_generator: {
        num: 46,
        prompt: "Generate a lyrics"
      },
      poetry_generator: {
        num: 47,
        prompt: "Generate a Poetry"
      },
      haiku_generator: {
        num: 48,
        prompt: "Generate a Haiku"
      },
      article_writer: {
        num: 49,
        prompt: "Write an article"
      },
      super_resolution: {
        num: 50,
        prompt: "Increase the resolution of this image"
      },
      website_builder: {
        num: 51,
        prompt: "Can you build a website for me?"
      },
      anagram_generator: {
        num: 52,
        prompt: "Can you generate the anagram for this word?"
      },
      anime_story_generator: {
        num: 53,
        prompt: "Generate an Anime Story"
      },
      academic_research_paper_generator: {
        num: 54,
        prompt: "Generate an Academic Research Paper"
      },
      meme_idea_generator: {
        num: 55,
        prompt: "Generate A Meme Idea"
      },
      video_game_idea_generator: {
        num: 56,
        prompt: "Generate an Video Game Idea"
      },
      movie_plot_generator: {
        num: 57,
        prompt: "Generate an Movie Plot"
      },
      tv_show_episode_generator: {
        num: 58,
        prompt: "Generate a TV Show Episode"
      },
      text_summarizer: {
        num: 59,
        prompt: "Can you summarize this text for me?"
      },
      text_improvement: {
        num: 60,
        prompt: "Can you improve this text for me?"
      },
      grammar_checker: {
        num: 61,
        prompt: "Can you check the grammar of this text for me?"
      },
      text_paraphraser: {
        num: 62,
        prompt: "Can you paraphrase this text for me?"
      },
      face_animation: {
        num: 69,
        prompt: "Can you animate my face?"
      },
      hair_style_changer: {
        num: 70,
        prompt: "Can you change my hair and make it blonde?"
      },
      age_progression: {
        num: 71,
        prompt: "Change my age."
      },
      object_detection: {
        num: 72,
        prompt: "Can you detect objects in this image?"
      },
      cartoonify_yourself: {
        num: 73,
        prompt: "Can you cartoonify myself?"
      },
      text_adventure_game: {
        num: 74,
        prompt: "I want to experience Text Adventure Game"
      },
      tarot_card_reader: {
        num: 75,
        prompt: "I want to experience Tarot Card Reading"
      },
      marriage_simulator: {
        num: 76,
        prompt: "I want to argue with my marriage"
      },
      life_simulator_game: {
        num: 77,
        prompt: "I want to try life simulator Game"
      },
      story_generator: {
        num: 78,
        prompt: "Can you generate a story using Story Generator?"
      },
      dating_simulator: {
        num: 79,
        prompt: "I want to be on date with someone."
      },
      ai_tools_directory: {
        num: 82,
        prompt: "I want search AI Tools"
      },
      chatgpt_prompts_database: {
        num: 83,
        prompt: "I want search chatgpt prompts"
      },
      ai_art_database: {
        num: 84,
        prompt: "I want search AI art"
      },
      virtual_pets: {
        num: 85,
        prompt: "I want to adopt a virtual pet"
      },
      life_coach: {
        num: 86,
        prompt: "I want to talk to a life coach"
      },
      thought_coach: {
        num: 87,
        prompt: "I want to talk to a thought coach"
      },
      problem_solver: {
        num: 89,
        prompt: "I want to speak to a problem solver"
      },
      "20_questions_game": {
        num: 91,
        prompt: "I want to play 20 questions game"
      },
      ai_financial_analyst: {
        num: 92,
        prompt: "I want to have an AI Financial Analyst"
      },
      book_summaries: {
        num: 93,
        prompt: "Connect me to book summaries tool"
      },
      recipes: {
        num: 95,
        prompt: "Connect me to the recipe tool"
      },
      "photo-to-story_generator": {
        num: 107,
        prompt: "Connect me to the Healthy Recipe tool"
      },
      lingo_swap: {
        num: 108,
        prompt: "Connect me to the Lingo Swap tool"
      },
      ai_battles: {
        num: 109,
        prompt: "Connect me to the AI Battle tool"
      },
      city_bot: {
        num: 111,
        prompt: "Connect me to City Bot tool"
      },
      text_removal_tool: {
        num: 112,
        prompt: "Connect me to Text Removal tool"
      },
      background_replacement_tool: {
        num: 113,
        prompt: "Connect me to Background Replacement tool"
      },
      celeb_lookalike: {
        num: 114,
        prompt: "Connect me to Celeb Lookalike tool"
      },
      movie_montage_maker: {
        num: 115,
        prompt: "Connect me to Movie Montage Maker tool"
      },
      "text-to-speech_(tts)": {
        num: 116,
        prompt: "Connect me to Text-To-Speech (TTS) tool"
      },
      domain_name_appraisals: {
        num: 117,
        prompt: "Connect me to Domain Name Appraisals tool"
      },
      sketch_game: {
        num: 118,
        prompt: "Connect me to Sketch Game tool"
      },
      rock_paper_scissors: {
        num: 119,
        prompt: "Connect me to RPS game"
      },
      automl: {
        num: 122,
        prompt: "AutoML"
      },
      ai_stock_market_trading: {
        num: 123,
        prompt: "Stocks"
      },
      impossible_animals_game: {
        num: 124,
        prompt: "Impossible Animals"
      },
      chess: {
        num: 125,
        prompt: "Chess"
      },
      ai_data_analyst: {
        num: 126,
        prompt: "AI Data Analyst"
      },
      virtual_girlfriends: {
        num: 127,
        prompt: "Virtual Girlfriend"
      },
      talk_with_books: {
        num: 128,
        prompt: "Talk with Books"
      },
      image_transformation_tool: {
        num: 129,
        prompt: "Image Transformation"
      },
      age_guesser: {
        num: 130,
        prompt: "Age Guesser"
      },
      deoldify_image_colorization: {
        num: 131,
        prompt: "Image Colorization"
      },
      chart_generator: {
        num: 132,
        prompt: "Flowchart"
      },
      virtual_boyfriends: {
        num: 133,
        prompt: "Virtual Boyfriends"
      },
      "valentine's_day_poem": {
        num: 134,
        prompt: "Generate Poem"
      }
    };
    this.num = 0;
  }
  getUid() {
    this.uid[this.num] = Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  async getSeshId(tool, options) {
    this.num = this.tools[tool]?.num;
    if (!this.sesh_id[this.num]) await this.getUid();
    const formData = new URLSearchParams();
    formData.append("prompt", encodeURIComponent(this.tools[tool]?.prompt));
    formData.append("uid", this.uid[this.num]);
    formData.append("sesh_id", "None");
    formData.append("get_tool", false);
    formData.append("tool_num", this.num);
    for (const [key, value] of Object.entries(options)) {
      if (!formData.has(key)) {
        formData.append(key, value);
      }
    }
    const res = await fetch(this.BASE_URL, {
      method: "POST",
      body: formData
    }).then(v => v.json() || v.text());
    if (res.status !== "success") {
      this.sesh_id[this.num] = "none";
      throw new Error("Failed to get session ID.");
    }
    this.sesh_id[this.num] = res.sesh_id;
  }
  async executeTool(tool, {
    prompt,
    ...options
  }) {
    try {
      await this.getSeshId(tool, options);
      const formData = new URLSearchParams();
      formData.append("prompt", encodeURIComponent(prompt));
      formData.append("uid", this.uid[this.num]);
      formData.append("sesh_id", this.sesh_id[this.num]);
      formData.append("get_tool", false);
      formData.append("tool_num", this.num);
      for (const [key, value] of Object.entries(options)) {
        if (!formData.has(key)) {
          form.append(key, value);
        }
      }
      const res = await fetch(this.BASE_URL, {
        method: "POST",
        body: formData
      }).then(v => v.json() || v.text());
      if (res.status !== "success") {
        await this.getSeshId(tool, options);
        return await this.executeTool(tool, {
          prompt: prompt,
          ...options
        });
      }
      return res.output ? (output => {
        const $ = cheerio.load(output);
        const imgSrc = $("img").attr("src");
        return imgSrc ? imgSrc : output;
      })(res.output) : res;
    } catch (e) {
      console.error(`Error executing tool '${tool}':`, e);
      throw e;
    }
  }
}
export {
  BoredHumans
};
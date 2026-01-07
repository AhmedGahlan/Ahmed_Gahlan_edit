
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCreativeBrief = async (idea: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `قم بتحويل الفكرة التالية إلى "Creative Brief" احترافي: "${idea}". 
      يجب أن يتضمن:
      1. أهداف الحملة.
      2. الرسالة الأساسية.
      3. الأسلوب البصري المقترح (Tone & Style).
      4. المنصات المستهدفة.
      اللغة: العربية الرصينة.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Brief Error:", error);
    return null;
  }
};

export const generateAdHooks = async (product: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اكتب 5 خطافات (Hooks) إعلانية قوية ومختلفة لمنتج: "${product}". 
      اجعلها متنوعة (نفسية، قائمة على الفضول، قائمة على النتيجة، قائمة على الألم). 
      اللغة: عربية جذابة للسوشيال ميديا.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Hooks Error:", error);
    return null;
  }
};

export const generateVideoScript = async (topic: string, platform: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اكتب سيناريو فيديو احترافي لمنصة ${platform} حول: "${topic}". السيناريو يجب أن يشمل وصف المشاهد البصرية والنص الصوتي.`,
    });
    return response.text;
  } catch (error) {
    return null;
  }
};

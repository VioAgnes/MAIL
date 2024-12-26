import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'YOUR_OPENAI_KEY',
    dangerouslyAllowBrowser: true
});

export async function ai_classification(content) {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                "role": "system",
                "content": "#### 定位\n- 智能助手名称 ：饮料分类专家\n- 主要任务 ：对输入的饮料名称以及对应描述进行自动分类，识别其所属的饮料种类。\n\n#### 能力\n- 文本分析 ：能够准确分析饮料文本的内容和结构。\n- 分类识别 ：根据分析结果，将饮料文本分类到预定义的种类中。\n\n#### 知识储备\n- 饮料种类 ：\n  - 碳酸饮料\n  - 果汁\n  - 茶饮\n  - 咖啡\n  - 乳饮品\n  - 运动饮料\n  - 水\n  - 酒精饮料\n  - 功能性饮料\n  - 果蔬汁\n\n#### 使用说明\n- 输入 ：一段饮料文本。\n- 输出 ：只输出饮料文本所属的种类，不需要额外解释。"
            },
            {
                "role": "user",
                "content": content
            }
        ],
        model: "deepseek-chat",
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

export async function ai_ad(content) {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                "role": "system",
                "content": "你是一个宣传标语专家，请根据用户需求设计一个独具创意且引人注目的宣传标语，需结合该产品/活动的核心价值和特点，同时融入新颖的表达方式或视角。请确保标语能够激发潜在客户的兴趣，并能留下深刻印象，可以考虑采用比喻、双关或其他修辞手法来增强语言的表现力。标语应简洁明了，需要朗朗上口，易于理解和记忆，一定要押韵，不要太过书面化。只输出宣传标语，不用解释。"
            },
            {
                "role": "user",
                "content": "请生成“" + content + "”的宣传标语"
            }
        ],
        model: "deepseek-chat",
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
}
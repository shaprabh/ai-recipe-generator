export function request(ctx) {
    const { ingredients = [] } = ctx.args;
  
    // Construct the prompt with the provided ingredients
    const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;
  
    // Return the request configuration
    return {
      resourcePath: `/model/amazon.nova-lite-v1:0/invoke`,
      method: "POST",
      params: {
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              messages: [
                  {
                      role: "user",
                      content:  [{"text": prompt}]
                  }
              ]
          }),
      },
    };
  }
  
  export function response(ctx) {
    // Parse the response body
    const parsedBody = JSON.parse(ctx.result.body);
    // Extract the text content from the response
    const res = {
      body: parsedBody.output.message.content[0].text,
    };
    // Return the response
    return res;
  }
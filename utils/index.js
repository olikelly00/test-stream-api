export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function messageText(message) {
  if(message.attachments?.length > 0) {
    const attachment = message.attachments[0]

    return `${ message.text } I recommend ${attachment.title} ${attachment.summary} ${attachment.detail}. What do you think?`
  }

  return message.text
}

export { default as OpenAIStream } from './OpenAIStream.js'
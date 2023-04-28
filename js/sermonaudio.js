const audioContainer = document.querySelector('.audio-files');
const sermonsFolder = '/sermons/';

fetch(sermonsFolder)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, 'text/html');
    const links = htmlDoc.querySelectorAll('a');
    const audioFiles = Array.from(links)
      .filter(link => link.href.endsWith('.mp3'))
      .map(link => decodeURIComponent(link.href.split('/').pop()))
      .sort();

    generateAudioDivs(audioContainer, sermonsFolder, audioFiles);
  })
  .catch(error => console.error(error));

const generateAudioDivs = (audioContainer, sermonsFolder, audioFiles) => {
  for (let i = 0; i < audioFiles.length; i++) {
    const audioFile = audioFiles[i];
    const audioDiv = document.createElement('div');
    audioDiv.classList.add('audio');
    const [name, titleWithExtension] = audioFile.split('-').map(str => str.replace('_', ' '));
    const title = titleWithExtension.replace(/\_/g, ' ').replace(/\..+$/, '').replace(/-/g, ':');
    audioDiv.innerHTML = `
      <audio controls>
        <source src="${sermonsFolder}${audioFile}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      
    `;
    audioContainer.appendChild(audioDiv);
  }
}

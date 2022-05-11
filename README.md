# nessiethegreat

## Description

The inspiration behind this project was to build a simple website for my friend’s band Nessie the Great. You can access this website at [nessiethegreat.com](https://www.nessiethegreat.com).

Built using vanilla JavaScript.

## Installation

This project wasn't intended to be duplicated. However, if you are an aspiring band and enjoy the layout feel free to clone this repo and use it as a template.

## Usage

This website was built with the intent to be hosted on GitHub Pages and pull the main content from [data.json](./data/data.json). This is to make it easy for someone non-technical to update the website.

## Credits

[lite-youtube](https://github.com/paulirish/lite-youtube-embed) was used for faster YouTube loading.

[spotify-embed-widgets](https://developer.spotify.com/documentation/widgets/generate/embed/) were used to embed the Spotify albums.

[font-awesome](https://fontawesome.com/v4/icons/) was used for the icons.

## Bugs & Improvements

- Website background could load a little faster/smoother.
- *lite-youtube* needs to double-click to play and pause in certain scenarios. Look into alternative fast Youtube player options.
- *lite-youtube* thumbnails get pixelated on a bigger screen, blur them at a certain point.
- Youtube videos are able to play over other YouTube videos.
- Youtube videos continue to play after switching to another section.
- Spotify players are able to play over other Spotify players when user is not connected with Spotify.
- Spotify players continue to play after switching to another section.
- Use a linter and a style guide

## Device Tests

| Device                  | Browser       | Viewport Width | Viewport Height | Screen Width | Screen Height | DPR  | Default View | Alt View                         | Notes                                                |
|-------------------------|---------------|----------------|-----------------|--------------|---------------|------|--------------|----------------------------------|------------------------------------------------------|
| Windows 10              | Chrome 101    | 2560           | 1329            | 2560         | 1440          | 1.00 | 5/11/2022     | null                            |                                                      |
| Windows 10              | Edge 101      | 2560           | 1329            | 2560         | 2560          | 1.00 | 5/11/2022     | null                            |                                                      |
| Windows 10              | Firefox 99    | 2560           | 1315            | 2560         | 2560          | 1.00 | 5/11/2022     | null                            |                                                      |
| iPad Pro 11inch 3rd Gen | Safari iOS 15 | 834            | 1075            | 834          | 1194          | 2.00 | 5/11/2022     | 5/11/2022                       |                                                      |
| iPad Pro 11inch 3rd Gen | Chrome 101    | 834            | 1087            | 834          | 1194          | 2.00 | 5/11/2022     | 5/11/2022                       |                                                      |
| Pixel 3                 | Chrome 101    | 393            | 654             | 393          | 786           | 2.75 | 5/11/2022     | 5/11/2022                       |                                                      |
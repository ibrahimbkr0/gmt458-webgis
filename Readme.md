# GMT 458 - Web GIS: Personal Portfolio Website

**Author:** Muhammed İbrahim Bakır  
**Student ID:** 2210674006  
**Course:** GMT 458 - Web GIS (Assignment 1)

## 📌 Project Overview
This project is a multi-page, fully responsive personal portfolio website developed as part of the GMT 458 Web GIS course. It showcases my academic background in Geomatic Engineering, technical skills, and web mapping capabilities. The project evolved from a basic HTML prototype into a dynamic, modern website featuring 3D elements, animations, and interactive web maps.

## 🚀 Key Features & Requirements Met
* **Multi-Page Structure:** The website consists of interconnected pages including `index.html` (Home, About, Skills), `experience.html` (Tabular data with images), and `contact.html` (Web Maps).
* **Animations & 3D Integration:** Implemented an interactive particle background using `particles.js` and embedded a 3D rotating personal avatar using Google's `<model-viewer>`. CSS hover effects are applied to the navigation menu.
* **Web GIS (Leaflet & OpenLayers):**
  * **Leaflet Map:** Displays specific locations with permanent tooltips. **Issue 1 Solved:** Implemented a custom zoom threshold logic (`zoomend` event) so markers remain hidden when zoomed out (zoom < 6) to prevent overlapping, and appear only when zoomed in. **Issue 2 Solved:** Used `noWrap: true` to prevent the Earth from repeating.
  * **OpenLayers Map:** Dynamically fetches a high-resolution GeoJSON file of Turkey's provincial borders. It colors specific polygons (visited cities) yellow by matching names from a JavaScript array. **Issue 2 Solved:** Used `wrapX: false` to prevent map repetition.
* **Responsive Design:** Used CSS Flexbox, Media Queries, and custom JavaScript DOM manipulation to ensure the layout, 3D models, and maps adapt flawlessly to mobile devices (including Safari fixes).

## 🤖 AI Usage Statement

**Estimated Total AI Usage Time:** ~4-5 Hours

Following the assignment guidelines, I utilized AI to resolve complex issues after researching them. Here are the specific things and technical concepts I learned from AI during this project:

1. **Responsive Design & Safari Bug Fixing:** I learned why Safari mobile browsers struggle with `display: contents` for 3D WebGL objects. Instead of duplicating the heavy 3D model in HTML (which crashes mobile browsers), I learned how to write a JavaScript "teleportation" script. This script dynamically moves the `<model-viewer>` element in the DOM based on `window.innerWidth`, ensuring it renders perfectly under the main title on mobile phones without memory issues.
2. **Leaflet Zoom Threshold Logic:** I learned how to group markers into an `L.layerGroup()` and use the `leafletMap.on('zoomend', function())` event listener. This taught me how to programmatically add or remove the marker layer based on `leafletMap.getZoom()`, solving the overlapping marker issue at low zoom levels.
3. **OpenLayers GeoJSON Dynamic Styling:** I learned how to fetch remote GeoJSON data without encountering CORS issues by using a raw GitHub CDN link. I also learned how to write a custom `styleFunction` that reads the `feature.get('name')` property of the GeoJSON and dynamically assigns different `ol.style.Fill` colors based on whether the city name exists in my predefined JavaScript array.
4. **CSS Flexbox Vertical Centering:** I learned how to solve the issue of content overflowing at the top of the screen on mobile devices by overriding `justify-content: center` with `height: auto` and `justify-content: flex-start` inside media queries.

## 🛠️ Software & Technologies Used
* HTML5, CSS3, JavaScript
* Leaflet.js
* OpenLayers (v8)
* Model-Viewer (WebGL)
* Particles.js
* Git & GitHub Pages
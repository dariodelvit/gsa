# Grupo Scout ACRUX 518 - Website Template

A modern, clean website template for Grupo Scout ACRUX 518, designed with a minimalist aesthetic inspired by professional design standards.

## Features

- **Modern Minimalist Design**: Clean layout with ample whitespace, inspired by contemporary web design
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle scroll animations and hover effects
- **Contact Form**: Functional contact form with validation
- **Social Media Integration**: Links to Facebook, Instagram, TikTok, and Twitter
- **Gallery Section**: Responsive image gallery with hover effects
- **Easy Navigation**: Fixed navbar with smooth scrolling

## File Structure

```
GSA/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── images/             # Image folder (add your images here)
└── README.md           # This file
```

## Setup Instructions

### 1. Add Your Images

Place your images in the `images/` folder with the following names:

**Unit Images:**
- `castores.jpg` - Castores unit image
- `manada.jpg` - Manada unit image  
- `scouts.jpg` - Scouts unit image
- `escultas.jpg` - Escultas unit image
- `clan.jpg` - Clan unit image

**Team Images:**
- `jj.jpg` - JJ (Coordinator)
- `marta.jpg` - Marta (Coordinator)
- `hugo.jpg` - Hugo (Coordinator)
- `malak.jpg` - Malak (Scouter)
- `keeo.jpg` - Keeo (Scouter)
- `burbuja.jpg` - Burbuja (Scouter)
- `tictac.jpg` - Tic tac (Scouter)
- `baloo.jpg` - Baloo (Scouter)
- `hathi.jpg` - Hathi (Scouter)
- `raksha.jpg` - Raksha (Scouter)
- `bagheera.jpg` - Bagheera (Scouter)
- `akela.jpg` - Akela (Scouter)
- `hermano-gris.jpg` - Hermano gris (Scouter)

**Gallery Images:**
- `jamboree2017.jpg` - Jamboree 2017
- `campamento-verano-2018.jpg` - Campamento de verano 2018
- `campamento-verano-2019.jpg` - Campamento de verano 2019
- `inicio-ronda-17-18.jpg` - Inicio de Ronda 17/18
- `inicio-ronda-18-19.jpg` - Inicio de Ronda 18/19
- `campamento-primavera-2018.jpg` - Campamento de primavera 2018
- `campamento-primavera-2019.jpg` - Campamento de primavera 2019

**Image Recommendations:**
- Use high-quality images (at least 800x600px)
- Optimize images for web (compress to reduce file size)
- Use consistent aspect ratios where possible
- For team photos, use square or circular images (1:1 ratio)

### 2. Customize Content

Edit `index.html` to update:
- Contact information (phone numbers, address)
- Social media links
- Text content as needed
- Add or remove team members

### 3. Test the Website

Simply open `index.html` in your web browser to test the website locally.

## Wix Import Instructions

### Option 1: Manual Recreation in Wix

1. **Create a new Wix site**
   - Go to wix.com and create a new account/site
   - Choose a blank template or a clean, minimal template

2. **Recreate the sections**
   - **Hero Section**: Use Wix's banner/hero section with the gradient background
   - **About Section**: Use a text section with the "Quiénes Somos" content
   - **Units Section**: Use a gallery or repeater to display the 5 units
   - **Team Section**: Use a team members gallery or profile cards
   - **Gallery Section**: Use Wix's Pro Gallery for the photo gallery
   - **Contact Section**: Use Wix's contact form and add your contact info
   - **Footer**: Add footer with social links and copyright

3. **Apply the styling**
   - Use the color scheme from this template:
     - Primary: #2c3e50 (dark blue)
     - Secondary: #3498db (blue)
     - Accent: #e74c3c (red)
     - Background: #ffffff (white)
     - Alt Background: #f8f9fa (light gray)
   - Use a clean, modern font (like Open Sans, Roboto, or Lato)
   - Maintain generous whitespace between sections

4. **Upload your images**
   - Upload all your images to Wix Media Manager
   - Replace placeholder images with your actual photos

### Option 2: HTML Embed in Wix

1. **Upload files to Wix**
   - Upload `index.html`, `styles.css`, and `script.js` to Wix
   - Upload your images to Wix Media Manager

2. **Use HTML iframe**
   - Add an HTML iframe element to your Wix page
   - Point it to your hosted HTML file
   - Note: You'll need to host the HTML file elsewhere (like GitHub Pages, Netlify, etc.)

### Option 3: Use as Reference Design

Use this template as a visual reference and recreate the design using Wix's drag-and-drop editor. This gives you the most flexibility and Wix-specific features.

## Customization Tips

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... other variables */
}
```

### Fonts
Change the font family in the CSS:
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

### Sections
Add or remove sections by editing the HTML in `index.html`. Each section is clearly marked with comments.

## Contact Form

The contact form currently shows a success message but doesn't send emails. To make it functional:

1. **Use a form service**: Connect to services like Formspree, Netlify Forms, or EmailJS
2. **Wix form**: If using Wix, use their built-in contact form instead
3. **Backend**: Add a backend service to handle form submissions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- Compress images before uploading
- Use modern image formats (WebP) when possible
- Enable caching on your hosting service
- Consider using a CDN for faster loading

## Support

For issues or questions about the template, refer to the code comments or contact your web developer.

## License

This template is provided for the Grupo Scout ACRUX 518 website.
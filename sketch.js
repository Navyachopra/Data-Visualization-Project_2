let table;
let cities = [];

function preload() {
  // Load CSV data
  table = loadTable('full_worldcities.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 600);
  background(173, 216, 230); // Light blue background color for the canvas

  // Sort by population and get the top 20 cities
  let rows = table.getRows();
  rows.sort((a, b) => int(b.get("population")) - int(a.get("population")));
  
  for (let i = 0; i < 20; i++) {
    let cityName = rows[i].get("city");
    let population = int(rows[i].get("population"));

    // Map population to ellipse size
    let size = map(population, 500000, 35676000, 20, 100); // Adjust ranges as needed

    // Create a new City object with a random position
    let city = new City(cityName, population, size);

    // Keep repositioning the ellipse if it overlaps with others
    let overlapping = true;
    while (overlapping) {
      overlapping = false;
      city.x = random(50, width - 50);
      city.y = random(50, height - 50);

      for (let other of cities) {
        let distance = dist(city.x, city.y, other.x, other.y);
        if (distance < (city.size / 2 + other.size / 2 + 10)) { // Adding a 10px gap
          overlapping = true;
          break;
        }
      }
    }
    // Add the positioned city to the array
    cities.push(city);
  }
}

function draw() {
  background(173, 216, 230); // Light blue background color for the canvas

  // Display each city as an ellipse
  for (let city of cities) {
    city.display();
  }
}
class City {
  constructor(name, population, size) {
    this.name = name;
    this.population = population;
    this.size = size;
    this.x = random(50, width - 50);
    this.y = random(50, height - 50);
    this.color = color(random(255), random(255), random(255)); // Random color for each city
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);

    // Display city name in white
    fill(255); // White color for the city name text
    textAlign(CENTER, CENTER);
    text(this.name, this.x, this.y);

    // Hover effect to show population
    if (dist(mouseX, mouseY, this.x, this.y) < this.size / 2) {
      fill(255);
      rectMode(CENTER);
      
      fill(0); // Black color for the population text
      textAlign(CENTER, CENTER);
      text(`Population: ${this.population}`, this.x, this.y - this.size / 2 - 20); // Display population
    }
  }
}

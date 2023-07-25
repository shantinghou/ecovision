let screen_width = 400;
let screen_height = 300;
let section_color;
let font_large;
let font_small;
let is_rolling = false;
let final_reward = null;
let roll_start_time = 0;
let wheel_angle = 0;
let wheel_speed = 3; // Adjust this value to control the wheel spin speed (lower value for slower spin)

function setup() {
  createCanvas(screen_width, screen_height);
  section_color = color(255, 165, 0); // Orange
  font_large = loadFont('path/to/font.ttf');
  font_small = loadFont('path/to/font.ttf');
  textFont(font_small);
  textSize(36);
}

function draw() {
  background(0);

  if (is_rolling) {
    // Calculate the elapsed time since the animation started
    const elapsed_time = (millis() - roll_start_time) / 1000;

    // Perform the gacha spin for 'spin_duration' seconds
    if (elapsed_time < 3) { // Animation duration (3 seconds)
      // Increment the wheel angle to simulate rotation
      wheel_angle += wheel_speed;
      // Display the spinning wheel
      drawWheel(width / 2, height / 2, 100, wheel_angle);
    } else {
      // Animation is complete, show the final reward
      final_reward = gachaSpin();
      is_rolling = false;
      // A slight delay before showing the final reward (adjust this value for a longer or shorter delay)
      setTimeout(showFinalReward, 500);
    }
  } else {
    // Display the "Click to Roll" message
    fill(255);
    text("Click to Roll", 120, 100);
    // Display the final reward
    if (final_reward) {
      text("You got:", 150, 150);
      text(final_reward, 100, 200);
    }
  }
}

function drawWheel(x, y, size, angle) {
  const num_sections = 8;

  for (let i = 0; i < num_sections; i++) {
    const angle_rad = radians(angle + i * 360 / num_sections);
    const start_pos = createVector(x, y);
    const end_pos = createVector(x + size * cos(angle_rad), y + size * sin(angle_rad));
    stroke(section_color);
    strokeWeight(5);
    line(start_pos.x, start_pos.y, end_pos.x, end_pos.y);
  }
}

function gachaSpin() {
  // List of rewards with their respective probabilities
  const rewards = [
    ["Common Item", 0.6],    // 60% chance
    ["Rare Item", 0.3],      // 30% chance
    ["Epic Item", 0.09],     // 9% chance
    ["Legendary Item", 0.01] // 1% chance
  ];

  // Generate a random number between 0 and 1
  const random_number = random();

  let cumulative_probability = 0;
  for (const [reward, probability] of rewards) {
    cumulative_probability += probability;

    // If the random number falls within the cumulative probability range,
    // the corresponding reward is obtained.
    if (random_number < cumulative_probability) {
      return reward;
    }
  }

  // If the random number exceeds the cumulative probability range (should be very unlikely),
  // return the last reward just to handle it gracefully.
  return rewards[rewards.length - 1][0];
}

function showFinalReward() {
  redraw();
}

function mouseClicked() {
  if (!is_rolling) {
    // Start the gacha spin animation when the user clicks the screen
    is_rolling = true;
    final_reward = null;
    roll_start_time = millis();
    wheel_angle = 0;
  }
}

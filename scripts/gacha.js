let screen_width = 1000;
let screen_height = 750;
let section_color;
let font_large;
let font_small;
let is_rolling = false;
let final_reward = null;
let roll_start_time = 0;
let wheel_angle = 0;
let wheel_speed = 3; 
// Pity system variables
let roll_counter = 0;
const rolls_until_pity = 9; 
let last_epic_roll = 0;

function setup() {
  createCanvas(screen_width, screen_height);
  section_color = color(173, 216, 230); 
  textSize(36);
  textFont('Amarante');
}

function draw() {
  clear();

  if (is_rolling) {
    const elapsed_time = (millis() - roll_start_time) / 1000;

    // Perform the gacha spin
    if (elapsed_time < 3) { 
      wheel_angle += wheel_speed;
      drawWheel(width / 2, height / 2, 250, wheel_angle);
    } else {
      final_reward = gachaSpin();
      is_rolling = false;
      setTimeout(showFinalReward, 500);
    }
  } else {
    fill(173, 216, 230);
    stroke(0, 0, 0, 0);
    textSize(36); 
    textAlign(CENTER);  
    text("Click to Roll", width / 2, height / 2);
    // Display the final reward
    if (final_reward) {
        fill(173, 216, 230);
        stroke(0, 0, 0, 0);
        textSize(36); 
        textAlign(CENTER); 
        text("You got:", 500, 150);
        text(final_reward, 500, 200);
    }
  }

  // Display the counter for the last time an epic item appeared
  stroke(0, 0, 0, 0);
  textSize(18); 
  fill(173, 216, 230);
  text(`Last Epic+ Roll: ${last_epic_roll}/${rolls_until_pity}`, 100, 25);
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
    ["Common Item", 0.6],    
    ["Rare Item", 0.3],     
    ["Epic Item", 0.09],     
    ["Legendary Item", 0.01] 
  ];

  // Increment the roll counter
  roll_counter++;

  // Check if the pity system is triggered
  if (roll_counter >= rolls_until_pity && last_epic_roll >= rolls_until_pity) {
    roll_counter = 0;
    last_epic_roll = 0;
    // Return an epic or legendary item with 90% and 10% probability respectively
    const pity_reward = random() < 0.9 ? "Epic Item" : "Legendary Item";
    return pity_reward;
  }

  // Generate a random number between 0 and 1
  const random_number = random();

  let cumulative_probability = 0;
  for (const [reward, probability] of rewards) {
    cumulative_probability += probability;

    // If the random number falls within the cumulative probability range,
    // the corresponding reward is obtained.
    if (random_number < cumulative_probability) {
      // If the reward is an epic or legendary item, update the last_epic_roll counter
      if (reward === "Epic Item" || reward === "Legendary Item") {
        last_epic_roll = 0;
      } else {
        // Increment the last_epic_roll counter if a non-epic item is rolled
        last_epic_roll++;
      }
      return reward;
    }
  }

  // If the random number exceeds the cumulative probability range,
  // return the last reward.
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

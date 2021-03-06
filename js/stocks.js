function load_stock_values(all_companies_stocks, strategy) {

  if (strategy == 'hardcoded') {
    console.log("Loading fake data...")
    all_companies_stocks[0] = [
        109.33, 106.25, 106.26, 107.75, 111.89, 112.01, 109.25, 110.22, 109.8, 106.82, 105.99, 108.72, 109.55, 112.4, 112.98, 113.1, 109.14, 115.31, 118.9, 117.16, 118.63, 118.65, 119.56, 119.94, 118.93, 119.72, 122.02, 124.88, 126.46, 127.08, 127.83, 128.715, 128.45, 129.495, 133, 132.17, 128.79, 130.415, 128.46, 129.09, 129.36, 128.54, 126.41, 126.6, 127.14, 124.51, 122.24, 124.45, 123.59, 124.95, 127.04, 128.47, 127.495, 125.9, 127.21, 126.69, 123.38, 124.24, 123.25, 126.37, 124.43, 124.25, 125.32, 127.35, 126.01, 125.6, 126.56, 127.1, 126.85, 126.3, 126.78, 126.17, 124.75, 127.6, 126.91, 128.62, 129.67, 130.28, 132.65, 130.56, 128.64, 125.15, 128.95, 128.7, 125.8, 125.01, 125.26, 127.62, 126.32, 125.865, 126.01, 128.95, 128.77, 130.19, 130.07, 130.06, 131.39, 132.54, 129.62, 132.045, 131.78, 130.28, 130.535, 129.96, 130.12, 129.36, 128.65, 127.8, 127.42, 128.88, 128.59, 127.17, 126.92, 127.6, 127.3, 127.88, 126.6, 127.61, 127.03, 128.11, 127.5, 126.75, 124.53, 125.425, 126.6, 126.44, 126, 125.69, 122.57, 120.07, 123.28, 125.66, 125.61, 126.82, 128.51, 129.62, 132.07, 130.75, 125.22, 125.16, 124.5, 122.77, 123.38, 122.99, 122.37, 121.3, 118.44, 114.64, 115.4, 115.13, 115.52, 119.72, 113.49, 115.24, 115.15, 115.96, 117.16, 116.5, 115.01, 112.65, 105.76, 103.12, 103.74, 109.69, 112.92, 113.29, 112.76, 107.72, 112.34, 110.37, 109.27, 112.31, 110.15, 112.57, 114.21, 115.31, 116.28, 116.41, 113.92, 113.45, 115.21, 113.4, 114.32, 115, 114.71, 112.44, 109.06, 110.3, 109.58, 110.38, 110.78, 111.31, 110.78, 109.5, 112.12, 111.6, 111.79, 110.21, 111.86, 111.04, 111.73, 113.77, 113.76, 115.5, 119.08, 115.28, 114.55, 119.27, 120.53, 119.5, 121.18, 122.57, 122, 120.92, 121.06, 120.57, 116.77, 116.11, 115.72, 112.34, 114.175, 113.69, 117.29, 118.78, 119.3, 117.75, 118.88, 118.03, 117.81, 118.3, 117.34, 116.28, 115.2, 119.03, 118.28, 118.23, 115.62, 116.17, 113.18, 112.48, 110.49, 111.34, 108.98, 106.03, 107.33, 107.23, 108.61, 108.03, 106.82, 108.74, 107.32, 105.26
    ];

    all_companies_stocks[1] = [
        529.55, 519.46, 506.64, 505.15, 506.91, 500.72, 497.06, 501.8, 505.93, 504.01, 510.455, 509.94, 520.39, 537.3, 541.95, 536.72, 521.19, 512.43, 513.23, 537.55, 532.2, 533.3, 526.1, 529.83, 533.875, 529.28, 540.16, 538, 546.01, 551.16, 545.01, 542.65, 546.45, 541.8, 535, 538.65, 547.33, 559.29, 562.63, 575.02, 578.795, 578.33, 581.435, 572.9, 574.1, 559.85, 555.69, 561.17, 553, 561.64, 557.61, 566.16, 563.67, 564.95, 565.37, 577.54, 567, 563.64, 557.55, 561.135, 554.7, 549.49, 541.31, 543.95, 544.86, 548.84, 548.02, 548.54, 548.64, 539.78, 541.04, 543.52, 532.74, 544.53, 542.925, 549.18, 557.46, 573.66, 566.12, 564.37, 561.39, 548.77, 551.16, 552.84, 543.045, 535.08, 542.04, 548.95, 545.78, 538.73, 539.49, 549.2, 546.49, 546.67, 549.28, 552.51, 556.81, 554.52, 547.19, 554.25, 554.18, 545.32, 549.21, 553.95, 555.29, 551.69, 549.53, 543.48, 542.16, 552.6, 550.04, 547.47, 543, 544.87, 546.6, 556.18, 557.52, 559.68, 563.39, 558.57, 557.95, 553.06, 541.25, 540.04, 543.3, 547.34, 545.62, 550.03, 541.7, 544.65, 556.11, 571.73, 584.18, 583.96, 601.78, 699.62, 692.84, 695.35, 695.1, 674.73, 654.77, 658.27, 659.66, 661.43, 664.56, 657.5, 664.72, 661.28, 673.29, 670.15, 664.39, 663.14, 690.3, 691.47, 686.51, 689.37, 694.11, 688.73, 694.04, 679.48, 644.03, 618.11, 612.47, 659.74, 667.96, 659.69, 647.82, 629.56, 644.91, 637.05, 628.96, 643.88, 643.41, 651.08, 655.3, 652.47, 665.07, 665.52, 671.67, 660.92, 666.98, 653.2, 653.29, 654.91, 640.15, 624.25, 622.61, 638.37, 642, 656.99, 671.68, 671.64, 670, 667, 671.24, 676.43, 683.17, 680.41, 693.02, 695.32, 699.95, 680, 671.8, 681.14, 719.33, 731.12, 732.82, 736.92, 744.85, 737.39, 747.74, 748.82, 755.31, 760.67, 761.6, 754.77, 758.26, 765.25, 756.53, 740.07, 750.42, 745.98, 760.01, 759.94, 777, 776.7, 769.63, 769.26, 771.97, 762.85, 783.79, 777.85, 768.2, 779.21, 772.99, 775.14, 762.55, 760.04, 750.42, 762.54, 760.09, 776.59, 769.83, 756.85, 760.8, 767.13, 768.51, 765.84, 782.24, 793.96, 790.3, 778.01
    ];

    all_companies_stocks[2] = [
        46.76, 46.325, 45.65, 46.23, 47.59, 47.19, 46.6, 46.355, 45.955, 45.48, 46.24, 46.39, 45.92, 47.13, 47.18, 47.01, 42.66, 41.19, 42.01, 40.4, 41.28, 41.6, 41.84, 42.45, 42.41, 42.36, 42.6, 42.38, 43.09, 43.87, 43.58, 43.53, 43.5, 43.855, 44.15, 44.09, 43.99, 44.055, 43.85, 43.88, 43.28, 43.055, 43.11, 42.36, 42.85, 42.03, 41.98, 41.02, 41.38, 41.56, 41.695, 42.5, 42.285, 42.88, 42.855, 42.9, 41.46, 41.21, 40.97, 40.96, 40.655, 40.72, 40.29, 41.545, 41.53, 41.42, 41.48, 41.72, 41.76, 41.65, 42.255, 42.16, 41.615, 42.905, 42.635, 42.985, 43.34, 47.87, 48.03, 49.155, 49.06, 48.64, 48.655, 48.24, 47.6, 46.28, 46.7, 47.75, 47.37, 47.35, 47.625, 48.72, 48.295, 48.01, 47.58, 47.58, 47.42, 46.9, 46.59, 47.61, 47.45, 46.86, 47.23, 46.92, 46.85, 46.36, 46.14, 45.73, 45.65, 46.61, 46.44, 45.97, 45.475, 45.83, 45.97, 46.72, 46.1, 46.23, 45.91, 45.635, 45.65, 45.26, 44.37, 44.15, 44.445, 44.4, 44.39, 44.3, 44.24, 44.52, 44.61, 45.54, 45.62, 45.76, 46.66, 46.62, 46.92, 47.28, 45.54, 46.11, 45.94, 45.35, 45.34, 46.29, 46.88, 46.7, 46.81, 47.54, 47.58, 46.62, 46.74, 47.33, 46.41, 46.74, 46.73, 47, 47.32, 47.27, 46.61, 45.66, 43.07, 41.68, 40.47, 42.71, 43.9, 43.93, 43.52, 41.82, 43.36, 43.5, 42.61, 43.89, 43.07, 43.29, 43.48, 43.04, 43.98, 44.3, 44.25, 43.48, 44.11, 43.9, 43.87, 43.91, 43.94, 43.29, 43.44, 44.26, 44.61, 45.57, 46.63, 46.75, 46.8, 47.45, 47.11, 47, 46.89, 46.68, 47.01, 47.51, 47.62, 47.77, 47.2, 48.03, 52.87, 54.25, 53.69, 53.98, 53.36, 52.64, 53.24, 54.15, 54.4, 54.38, 54.92, 54.16, 53.51, 53.65, 53.32, 52.84, 53.765, 52.97, 53.85, 53.94, 54.19, 54.19, 54.25, 53.69, 53.93, 54.35, 55.22, 55.21, 54.2, 55.91, 55.81, 55.79, 54.98, 55.27, 54.06, 55.14, 55.2, 56.13, 55.7, 54.13, 54.83, 55.35, 55.82, 55.67, 55.95, 56.55, 56.31, 55.48
    ];

    for (var i = 0; i < all_companies_stocks.length; i++) {
      normalize_stock_values(all_companies_stocks[i]);
    }
  }
  else if (strategy == 'random') {
    var num_companies = 3;
    var num_stock_values = 800;
    // for each company
    for (var i = 0; i < num_companies; i++) {
      console.log("Generating random stocks for company " + i);
      all_companies_stocks[i] = []
      all_companies_stocks[i].push(0);
      for (var j = 1; j < num_stock_values; j++) {
        var next_value = softened_random_value(all_companies_stocks[i][j-1]);
        all_companies_stocks[i].push(next_value);
      }
    }
  }
}

/**
 * Init all companies stocks arrays
 */
function init_all_companies_stocks(companies_stocks, num_companies) {
    console.log("Num companies: " + num_companies);
    for (var i = 0; i < num_companies; i++) {
    console.log("Generating stocks for company number " + i + " TOTAL COMPANIES: " + num_companies);
    var new_company_stocks = []
    init_company_stocks(new_company_stocks, 150);
    
    companies_stocks.push(new_company_stocks);
  }
}

/**
 * Fills an array representing a company's stock values with 'num_values' random
 * values
 */
function init_company_stocks(stock_values, num_values) {
  for (var i = 0; i < num_values; i++) {
    var new_value = generate_rand_int(1, 100);
    stock_values.push(new_value);
  }
}

/**
 * Generates random value between [floor, roof] to be pushed into the stocks arrays
 */
function generate_rand_int(floor, roof) {
  return Math.floor((Math.random() * 100) + 1);
}

/**
 *
 */
function softened_random_value(previous_value) {
  
  var decision = generate_rand_int(1, 100);
  
  var xl_change_value = 20;
  var xs_change_value = 5;

  // generate a big change in the value
  if (decision > 0 && decision <= 20) {
    var decision  = generate_rand_int(1, 100);
    var variation = generate_rand_int(1, xl_change_value);
    // add
    if (decision > 50) {
      next_value = previous_value + variation;
    }
    // substract
    else {
      next_value = previous_value - variation;
    }
  }
  // generate a little change in the value
  else if (decision > 20 && decision <= 95) {
    var decision  = generate_rand_int(1, 100);
    var variation = generate_rand_int(1, xs_change_value);
    // increment the value
    if (decision > 50) {
      next_value = previous_value + variation;
    }
    // decrement the value
    else {
      next_value =  previous_value - variation;
    }
  }
  // generate a completely random value
  else if (decision > 95) {
    return generate_rand_int(200, 400);
  }
  
  // check we don't exceed maximum or minimum height values
  if (next_value > 600) next_value = 500;
  if (next_value < 1) next_value = 100;
  
  return next_value;
}

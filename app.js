// Paper Industry Dashboard JavaScript

// Data for charts
const paperData = {
  globalProduction: {
    countries: ["China", "United States", "Japan", "Germany", "India", "Indonesia", "Finland", "Canada", "South Korea", "Brazil"],
    production2019: [99300, 75083, 26627, 22698, 12000, 18260, 11392, 12112, 11492, 10159],
    printingWritingPaper: [25089, 10795, 7511, 6015, 5120, 4809, 4601, 2704, 2605, 2414]
  },
  recyclingRates: {
    countries: ["Finland", "Germany", "Japan", "USA", "Sweden", "China", "India", "Global Average"],
    recoveryRates: [100, 87.1, 80, 68.2, 69, 46.5, 27, 58]
  },
  indiaTrends: {
    years: [2011, 2015, 2019, 2020, 2023, 2024],
    totalConsumption: [10.11, 13, 16, 20, 23, 24],
    perCapita: [8, 10, 12, 15, 16, 16],
    recoveryRate: [25, 27, 27, 30, 30, 30]
  }
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeTabs();
  initializeCharts();
});

// Tab functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// Initialize charts
function initializeCharts() {
  createOverviewProductionChart();
  createOverviewRecyclingChart();
}

// Create overview production chart
function createOverviewProductionChart() {
  const ctx = document.getElementById('overviewProductionChart').getContext('2d');
  
  // Get top 8 countries for better visualization
  const topCountries = paperData.globalProduction.countries.slice(0, 8);
  const topProduction = paperData.globalProduction.production2019.slice(0, 8);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: topCountries,
      datasets: [{
        label: 'Total Production (thousand tons)',
        data: topProduction,
        backgroundColor: chartColors.slice(0, 8),
        borderColor: chartColors.slice(0, 8).map(color => color + '80'),
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Top 8 Countries by Paper Production (2019)',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: 20
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y.toLocaleString()} thousand tons`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Production (thousand tons)'
          },
          ticks: {
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        },
        x: {
          title: {
            display: true,
            text: 'Countries'
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Create overview recycling chart
function createOverviewRecyclingChart() {
  const ctx = document.getElementById('overviewRecyclingChart').getContext('2d');
  
  // Sort countries by recycling rate for better visualization
  const sortedData = paperData.recyclingRates.countries.map((country, index) => ({
    country,
    rate: paperData.recyclingRates.recoveryRates[index]
  })).sort((a, b) => b.rate - a.rate);
  
  const sortedCountries = sortedData.map(item => item.country);
  const sortedRates = sortedData.map(item => item.rate);
  
  // Color India differently to highlight the gap
  const colors = sortedCountries.map(country => {
    if (country === 'India') return '#DB4545'; // Red for India
    if (country === 'Global Average') return '#5D878F'; // Gray for global average
    return '#1FB8CD'; // Teal for others
  });
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedCountries,
      datasets: [{
        label: 'Recovery Rate (%)',
        data: sortedRates,
        backgroundColor: colors,
        borderColor: colors.map(color => color + '80'),
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Paper Recycling Recovery Rates by Country',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: 20
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.x}% recovery rate`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Recovery Rate (%)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Countries'
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Add hover effects and interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to stat cards
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add hover effects to insight cards
  const insightCards = document.querySelectorAll('.insight-card');
  insightCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add keyboard navigation for tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (index + 1) % tabButtons.length;
        tabButtons[nextIndex].focus();
        tabButtons[nextIndex].click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[prevIndex].focus();
        tabButtons[prevIndex].click();
      }
    });
  });
});

// Add loading states for charts
function showChartLoading(chartId) {
  const container = document.getElementById(chartId).parentElement;
  container.innerHTML = '<div class="loading-spinner">Loading chart...</div>';
}

// Utility function to format numbers
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Add resize handler for charts
window.addEventListener('resize', function() {
  Chart.helpers.each(Chart.instances, function(instance) {
    instance.resize();
  });
});

// Export data functionality (optional enhancement)
function exportData(format = 'csv') {
  console.log('Export functionality would be implemented here');
  // This could be extended to actually export the data
}

// Print functionality (optional enhancement)
function printDashboard() {
  window.print();
}

// Analytics tracking (placeholder)
function trackEvent(eventName, parameters = {}) {
  console.log('Analytics event:', eventName, parameters);
  // This could be connected to actual analytics service
}

// Track tab switches
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      trackEvent('tab_switch', { tab: tabName });
    });
  });
});
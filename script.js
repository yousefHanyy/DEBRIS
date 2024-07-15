const drawer = document.getElementById("drawer");
let mouseOver = false; //!To fix any scrolling while hovering over the menu or drawer
document.addEventListener("DOMContentLoaded", function () {
  const navIcon = document.getElementById("menu-icon");
  navIcon.addEventListener("mouseenter", function () {
    drawer.classList.add("active");
    mouseOver = true;
  });

  navIcon.addEventListener("mouseleave", function () {
    drawer.classList.remove("active");
    mouseOver = false;
  });

  drawer.addEventListener("mouseenter", function () {
    drawer.classList.add("active");
    mouseOver = true;
  });

  drawer.addEventListener("mouseleave", function () {
    drawer.classList.remove("active");
    mouseOver = false;
  });
});

//? Making the navbar disappear on scrolling
const navBar = document.getElementById("navBar");
var prevScrollPos = window.scrollY;
window.onscroll = () => {
  var currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos || mouseOver === true) {
    navBar.style.top = "0";
  } else {
    navBar.style.top = "-50px";
  }
  prevScrollPos = currentScrollPos;
};

function initMap() {
  const mapOptions = {
    center: { lat: 31, lng: 31.37 },
    zoom: 15,
    mapTypeId: "satellite",
  };

  const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  const marker = new google.maps.Marker({
    position: { lat: 31, lng: 31.37 },
    map: map,
    title: "I am here",
  });

  function fetchRobotLocation() {
    fetch("http://192.168.1.19:5000/api/robot-location")
      .then((response) => response.json())
      .then((data) => {
        const newPosition = { lat: data.latitude, lng: data.longitude };
        map.setCenter(newPosition);
        marker.setPosition(newPosition);
        marker.setTitle(`Lat: ${data.latitude}, Lng: ${data.longitude}`);
      })
      .catch((error) => console.error("Error fetching robot location:", error));
  }

  setInterval(fetchRobotLocation, 5000);
}
// function fetchSensorData() {
//   fetch("http://192.168.1.19:5000/data_show")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Fetched data:", data);
//       const clientData = data["ESP32_2"];
//       if (clientData && clientData.length > 0) {
//         const latestData = clientData[clientData.length - 1];
//         console.log(latestData);
//         document.getElementById("temperature").textContent =
//           latestData.temperature !== undefined
//             ? Math.round(latestData.temperature) + " °C"
//             : "No Data detected";
//         document.getElementById("pressure").textContent =
//           latestData.bmp_pressure !== undefined
//             ? latestData.bmp_pressure + " Pa"
//             : "No Data detected";
//         document.getElementById("humidity").textContent =
//           latestData.humidity !== undefined
//             ? latestData.humidity + " %"
//             : "No Data detected";
//         document.getElementById("doppler").textContent =
//           latestData.motion !== undefined
//             ? latestData.motion
//             : "No Data detected";
//         document.getElementById("Conclusion").textContent =
//           latestData.conclusion !== undefined
//             ? latestData.conclusion
//             : "No Data detected";
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching sensor data:", error);
//     });
// }
// setInterval(fetchSensorData, 100);
// fetchSensorData();

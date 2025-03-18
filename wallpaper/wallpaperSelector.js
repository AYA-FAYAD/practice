import https from "https";
const images = {
  sunrise: "./images/sunrise.png",
  sunset: "./images/sunset.png",
  evening: "./images/evening.png",
  morning: "./images/morning.png",
  night: "./images/night.png",
  noon: "./images/noon.png",
};
// const getLocalTimezone = (utcDate) => {
//   return new Date(
//     new Date(utcDate).getTime() - new Date(utcDate).getTimezoneOffset() * 60000
//   ).toISOString();
// };
const convertToLocal = (utcDates) => {
  const utcDate = new Date(utcDates);
  return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
};

function gitSunTime(lat, lng) {
  return new Promise((resolve, reject) => {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;

    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));
        console.log(data);
        res.on("end", () => {
          const json = JSON.parse(data);
          if (json.status == "OK") {
            resolve(json.results);
          } else {
            reject("Error");
          }
        });
      })
      .on("error", (err) => {
        reject("API req failed" + err.message);
      });
  });
}

async function selectWalpaper(lat, lon) {
  const suntime = await gitSunTime(lat, lon);
  console.log(lat, lon);
  const sunrise = convertToLocal(suntime.sunrise);
  const sunset = convertToLocal(suntime.sunset);
  const solarNoon = convertToLocal(suntime.solar_noon);

  const currentTime = new Date();

  console.log(suntime);
  console.log(currentTime);

  const addMinutes = (date, mins) => new Date(date.getTime() + mins * 60000);
  const timeRange = [
    {
      name: images.sunrise,
      start: sunrise,
      end: addMinutes(sunrise, 5),
    },
    {
      name: images.morning,
      start: addMinutes(sunrise, 5),
      end: addMinutes(solarNoon, -3),
    },
    {
      name: images.noon,
      start: solarNoon,
      end: addMinutes(solarNoon, 3),
    },
    {
      name: images.evening,
      start: addMinutes(solarNoon, 3),
      end: addMinutes(sunset, -5),
    },
    {
      name: images.sunset,
      start: sunset,
      end: addMinutes(sunset, 5),
    },
  ];
  console.log(timeRange);
  const selectedwallpeper =
    timeRange.find(
      (range) => currentTime >= range.start && currentTime < range.end
    )?.name || images.night;
  console.log(selectedwallpeper);
  return selectWalpaper;
}

// selectWalpaper(-51.63092, -69.2247).then(console.log);
// selectWalpaper(31.9544, 35.9106).then(console.log);

// console.log(args);
// selectWalpaper(parseFloat(args));
const args = process.argv.slice(2);
const lat = parseFloat(args[0]);
const lon = parseFloat(args[1]);

selectWalpaper(lat, lon);

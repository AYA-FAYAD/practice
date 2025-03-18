import https from "https";

const images = {
  sunrise: "sunrise.png",
  sunset: "sunset.png",
  evening: "evening.png",
  morning: "morning.png",
  night: "night.png",
  noon: "noon.png",
};

const convertToLocalTime = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
};

function getSunTimes(lat, lon) {
  return new Promise((resolve, reject) => {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const json = JSON.parse(data);
          if (json.status === "OK") {
            resolve(json.results);
          } else {
            reject(new Error("Error fetching sun times."));
          }
        });
      })
      .on("error", (err) => {
        reject(new Error("API request failed: " + err.message));
      });
  });
}

async function selectWallpaper(lat, lon) {
  const sunTimes = await getSunTimes(lat, lon);
  const sunriseTime = convertToLocalTime(sunTimes.sunrise);
  const sunsetTime = convertToLocalTime(sunTimes.sunset);
  const solarNoonTime = convertToLocalTime(sunTimes.solar_noon);

  const currentTime = new Date();

  const addMinutes = (date, mins) => new Date(date.getTime() + mins * 60000);

  const timeIntervals = [
    {
      name: images.sunrise,
      start: sunriseTime,
      end: addMinutes(sunriseTime, 5),
    },
    {
      name: images.morning,
      start: addMinutes(sunriseTime, 5),
      end: addMinutes(solarNoonTime, -3),
    },
    {
      name: images.noon,
      start: solarNoonTime,
      end: addMinutes(solarNoonTime, 3),
    },
    {
      name: images.evening,
      start: addMinutes(solarNoonTime, 3),
      end: addMinutes(sunsetTime, -5),
    },
    {
      name: images.sunset,
      start: sunsetTime,
      end: addMinutes(sunsetTime, 5),
    },
  ];

  const selectedWallpaper =
    timeIntervals.find(
      (interval) => currentTime >= interval.start && currentTime < interval.end
    )?.name || images.night;

  console.log(selectedWallpaper);
  return selectedWallpaper;
}

const args = process.argv.slice(2);
const lat = parseFloat(args[0]);
const lon = parseFloat(args[1]);

selectWallpaper(lat, lon);

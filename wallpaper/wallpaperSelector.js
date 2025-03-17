const https = require("https");

function getdats(lat, lng) {
  return new Promise((resolve, reject) => {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;

    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (ckunck) => (data += ckunck));
        console.log(data);
        res.on("end", () => {
          const josn = JSON.parse(data);
          if (josn.status == "OK") {
            resolve(josn.results);
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
  const suntime = await getdats(lat, lon);
  console.log(suntime);
  const currentTime = getLocalTimezone(new Date());
  const sunrise = getLocalTimezone(suntime.sunrise);
  const noon = getLocalTimezone(suntime.solar_noon);
  const sunset = getLocalTimezone(suntime.sunset);

  console.log("sunSet:" + sunset);
  console.log("currenTime:" + currentTime);
  console.log("sunRise:" + sunrise);
  console.log("noon:" + noon);
  let wallpaper = "";
  if (currentTime === sunrise) {
    wallpaper = "sunrise.png";
  } else if (currentTime === sunset) {
    wallpaper = "sunset.png";
  } else if (currentTime === noon) {
    wallpaper = "noon.png";
  } else if (currentTime > sunrise && currentTime < noon) {
    wallpaper = "morning.png";
  } else if (currentTime > noon && currentTime < sunset) {
    wallpaper = "eveinig.png";
  } else {
    wallpaper = "night.png";
  }
  console.log(wallpaper);
}

// new Date().getTime();
// console.log(new Date().getTime());

const getLocalTimezone = (utcDate) => {
  return new Date(
    new Date(utcDate).getTime() - new Date(utcDate).getTimezoneOffset() * 60000
  ).toISOString();
};

// getdats(31.99512, 35.95851).then(({ sunrise }) => {
//   const currentTime = getLocalTimezone(new Date());
//   const _sunrise = getLocalTimezone(sunrise);

//   console.log("curr time", currentTime);
//   console.log("sunrse", _sunrise);
// });
selectWalpaper(31.99512, 35.95851).then(console.log);

let url;
let Show = document.getElementById("show");
const get_data = async (url) => {
  try {
    const response = await fetch(url);
    let json = await response.json();
    // console.log(json);
    if (json.errorCode != undefined) {
      document.getElementById("message").innerHTML =
        "SomeThing is Wrong Please Enter right Information";
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};
const clearUi = () => {
  const array = document.getElementsByClassName("output");
  const l = document.getElementsByClassName("output").length;
  document.getElementById("message").innerHTML = "";
  for (let i = 0; i < l; ++i) {
    array[i].innerHTML = "";
  }
};
Show.addEventListener("click", async (e) => {
  e.preventDefault();
  clearUi();
  pincode = document.getElementById("pincode").value;
  let date = new Date(document.getElementById("date").value);
  let month = date.getMonth() + 1;
  dateString = date.getDate() + "-" + month + "-" + date.getFullYear();
  url =
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
    pincode +
    "&date=" +
    dateString;
  const respos = await get_data(url);
  setTimeout(() => {
    let index = 0;
    let sessions;
    do {
      sessions = respos.sessions[index];
      if (respos.sessions.length == 0) {
        document.getElementById("message").innerHTML = "Slot Not Available";
        // console.log("Not Available");
        break;
      } else if (sessions == undefined) {
        break;
      }
      index++;
      let res = `
      <tr class="output">
      <td>${sessions.center_id}</td>
      <td>${sessions.name}</td>
      <td>${sessions.address}</td>
      <td>${sessions.state_name}</td>
      <td>${sessions.district_name}</td>
      <td>${sessions.from}</td>
      <td>${sessions.to}</td>
      <td>${sessions.fee}</td>
      <td>${sessions.available_capacity}</td>
      <td>${sessions.vaccine}</td>
      <td>${sessions.slots}</td>
    </tr>
      `;
      document.getElementById("res").innerHTML += res;
      // console.log(sessions);
    } while (sessions != undefined);
  }, 1000);
});

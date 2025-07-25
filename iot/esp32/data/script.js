document.getElementById('wifi-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const ssid = document.getElementById('ssid').value;
  const password = document.getElementById('password').value;

  fetch('/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ssid, password })
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => console.error('Error sending credentials:', err));
});








// device initilization page



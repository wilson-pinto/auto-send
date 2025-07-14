const bookings = [];

function getWhatsappMessage(booking) {
  const msg = document.getElementById("message").value;
  return `Dear ${booking.name}, 
${msg}`;
}

// Add file input listener and CSV parsing
document.getElementById("fileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    const text = event.target.result;
    // Simple CSV parsing (expects: name,mobile per line)
    const lines = text.split("\n").filter(Boolean);
    window.bookings = lines.map((line) => {
      const [name, mobile] = line.split(",");
      return { name: name.trim(), mobile: mobile.trim() };
    });
    console.log("Bookings loaded:", window.bookings);
  };
  reader.readAsText(file);
});

// Use window.bookings if available, else fallback
document.getElementById("send").onclick = () => {
  const data = window.bookings || bookings;
  data.forEach((booking, idx) => {
    const message = getWhatsappMessage(booking);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://web.whatsapp.com/send?phone=${booking.mobile}&text=${encodedMessage}`;
    setTimeout(() => {
      console.log(`Opening WhatsApp for: ${booking.name} (${booking.mobile})`);
      window.open(url, "_blank");
    }, idx * 15000); // Stagger openings
  });
};

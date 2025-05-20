document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("adminLoginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    const res = await fetch(`https://sheetdb.io/api/v1/hzin7qrg1qy6y/search?sheet=admins&email=${email}&password=${password}`);
    const data = await res.json();

    if (data.length > 0) {
      document.getElementById("loginMsg").textContent = "✅ Login successful!";
      // You can show search form or redirect here
    } else {
      document.getElementById("loginMsg").textContent = "❌ Invalid credentials.";
    }
  });
});


  // 🔎 Student Search
  window.searchStudent = async () => {
    const regNo = document.getElementById("searchRegNo").value.trim();
    resultDiv.innerHTML = '';
    printBtn.style.display = 'none';

    const res = await fetch(`https://sheetdb.io/api/v1/hzin7qrg1qy6y/search?sheet=students&reg_no=${regNo}`);
    const data = await res.json();

    if (data.length > 0) {
      const s = data[0];
      const photo = s.photo_url?.startsWith("http") ? s.photo_url : "https://via.placeholder.com/120";
      const doc = s.document_url?.startsWith("http") ? `<a href="${s.document_url}" target="_blank">📎 View Document</a>` : "❌ No document";

      resultDiv.innerHTML = `
        <div class="student-card">
          <h3>👤 Student Record</h3>
          <img src="${photo}" alt="Passport Photo" />
          <p><strong>Reg No:</strong> ${s.reg_no}</p>
          <p><strong>Name:</strong> ${s.fullname}</p>
          <p><strong>DOB:</strong> ${s.dateofbirth}</p>
          <p><strong>Gender:</strong> ${s.gender}</p>
          <p><strong>Email:</strong> ${s.email}</p>
          <p><strong>Phone:</strong> ${s.phone}</p>
          <p><strong>Address:</strong> ${s.address}</p>
          <p><strong>Course:</strong> ${s.course}</p>
          <p><strong>Document:</strong> ${doc}</p>
        </div>
      `;
      resultDiv.style.display = "block";
      printBtn.style.display = "inline-block";
    } else {
      resultDiv.innerHTML = "<p>❌ No student found with that registration number.</p>";
      resultDiv.style.display = "block";
    }
  };
});

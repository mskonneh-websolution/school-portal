document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("adminLoginForm");
  const searchSection = document.getElementById("searchSection");
  const resultDiv = document.getElementById("studentResult");
  const printBtn = document.getElementById("printBtn");

  // ✅ Admin login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    try {
      const res = await fetch(`https://sheetdb.io/api/v1/hzin7qrg1qy6y/search?sheet=admins&email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        // ✅ Login successful: show search section
        loginForm.style.display = "none";
        searchSection.style.display = "block";
        document.getElementById("loginMsg").textContent = "✅ Login successful";
        document.getElementById("loginMsg").style.color = "green";
      } else {
        // ❌ Invalid
        document.getElementById("loginMsg").textContent = "❌ Invalid credentials";
        document.getElementById("loginMsg").style.color = "red";
      }
    } catch (err) {
      console.error(err);
      document.getElementById("loginMsg").textContent = "⚠️ Error during login.";
    }
  });

  // ✅ Search student
  window.searchStudent = async () => {
    const regNo = document.getElementById("searchRegNo").value.trim();
    resultDiv.innerHTML = '';
    printBtn.style.display = 'none';

    if (!regNo) {
      resultDiv.innerHTML = "<p style='color:red;'>Enter a registration number.</p>";
      return;
    }

    try {
      const res = await fetch(`https://sheetdb.io/api/v1/hzin7qrg1qy6y/search?sheet=students&reg_no=${regNo}`);
      const data = await res.json();

      if (data.length > 0) {
        const s = data[0];
        resultDiv.innerHTML = `
          <div class="student-card">
            <h3>Student Record</h3>
            <img src="${s.photo_url || 'https://via.placeholder.com/120'}" alt="Student Photo" />
            <p><strong>Reg No:</strong> ${s.reg_no}</p>
            <p><strong>Full Name:</strong> ${s.fullname}</p>
            <p><strong>DOB:</strong> ${s.dateofbirth}</p>
            <p><strong>Gender:</strong> ${s.gender}</p>
            <p><strong>Email:</strong> ${s.email}</p>
            <p><strong>Phone:</strong> ${s.phone}</p>
            <p><strong>Address:</strong> ${s.address}</p>
            <p><strong>Course:</strong> ${s.course}</p>
            ${
              s.document_url && s.document_url !== "Pending"
                ? `<a href="${s.document_url}" target="_blank">📎 View Document</a>`
                : `<em>No document uploaded.</em>`
            }
          </div>
        `;
        printBtn.style.display = "inline-block";
      } else {
        resultDiv.innerHTML = "<p style='color:red;'>❌ No student found with that Reg No.</p>";
      }
    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = "<p style='color:red;'>⚠️ Could not fetch student data.</p>";
    }
  };
});

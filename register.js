document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const course = document.getElementById("course").value;
  const reg_no = `STU${Date.now().toString().slice(-6)}`;
  const dateofbirth = document.getElementById("dateofbirth").value.trim();
  const gender = document.getElementById("gnder").value.trim();

  const photoFile = document.getElementById("photo").files[0];
  const docFile = document.getElementById("document").files[0];

  // Simulate file upload by storing just the filenames
  const photo_url = photoFile ? photoFile.name : "";
  const document_url = docFile ? docFile.name : "";

  const data = {
    reg_no,
    fullname,
    dateofbirth,
    gender,
    email,
    phone,
    address,
    course,
    photo_url,
    document_url
  };

  try {
    const res = await fetch("https://sheetdb.io/api/v1/hzin7qrg1qy6y", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });

    const msg = document.getElementById("successMsg");
    if (res.ok) {
      msg.textContent = `✅ Registered! Your Reg No is ${reg_no}`;
      this.reset();
    } else {
      msg.textContent = "❌ Submission failed.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("successMsg").textContent = "❌ Error connecting to server.";
  }
});

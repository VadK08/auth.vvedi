const API = "http://127.0.0.1:8000";

function authHeader() {
    return {
        "Authorization": "Bearer " + localStorage.getItem("session")
    };
}

fetch(API + "/settings", { headers: authHeader() })
    .then(r => r.json())
    .then(data => {
        document.getElementById("topic").value = data.topic || "";
        document.getElementById("genimg").checked = data.generate_image || false;
        document.getElementById("usenews").checked = data.use_news || false;
        document.getElementById("adtitle").value = data.ad_title || "";
        document.getElementById("addesc").value = data.ad_description || "";
        document.getElementById("times").value = (data.post_times || []).join(", ");
    });

document.getElementById("saveBtn").onclick = () => {
    const body = {
        topic: document.getElementById("topic").value,
        generate_image: document.getElementById("genimg").checked,
        use_news: document.getElementById("usenews").checked,
        ad_title: document.getElementById("adtitle").value,
        ad_description: document.getElementById("addesc").value,
        post_times: document.getElementById("times").value
            .split(",")
            .map(x => x.trim())
            .filter(Boolean)
    };

    fetch(API + "/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(body)
    })
        .then(r => r.json())
        .then(() => alert("Настройки сохранены"));
};

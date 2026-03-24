const BIN_ID = "69c23186c3097a1dd55429f2";
const API_KEY = "$2a$10$tbe9LcZbefI37jzYZa7qMurmA3RYF3OLoIhb2vs5CyBUJKoGKLSjC";

async function getLocation() {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
        ip: data.ip,
        pays: data.country_name,
        ville: data.city,
        region: data.region,
        latitude: data.latitude,
        longitude: data.longitude
    };
}

async function saveVisitor() {
    const location = await getLocation();
    const now = new Date();
    const visitor = {
        ip: location.ip,
        pays: location.pays,
        ville: location.ville,
        region: location.region,
        page: window.location.pathname,
        heure: now.toLocaleString("fr-FR"),
        navigateur: navigator.userAgent.substring(0, 50)
    };

    // Récupérer les visiteurs existants
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { "X-Master-Key": API_KEY }
    });
    const getData = await getRes.json();
    const visiteurs = getData.record.visiteurs || [];
    visiteurs.push(visitor);

    // Sauvegarder
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": API_KEY
        },
        body: JSON.stringify({ visiteurs: visiteurs })
    });
}

saveVisitor();

const BIN_ID = "69c23186c3097a1dd55429f2";
const API_KEY = "$2a$10$tbe9LcZbefI37jzYZa7qMurmA3RYF3OLoIhb2vs5CyBUJKoGKLSjC";

async function saveVisitor() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const loc = await res.json();
        
        const visitor = {
            ip: loc.ip || "inconnu",
            pays: loc.country_name || "inconnu",
            ville: loc.city || "inconnu",
            page: window.location.pathname,
            heure: new Date().toLocaleString("fr-FR"),
            navigateur: navigator.userAgent.substring(0, 80)
        };

        const getRes = await fetch("https://api.jsonbin.io/v3/b/" + BIN_ID + "/latest", {
            headers: { 
                "X-Master-Key": API_KEY,
                "X-Access-Key": API_KEY
            }
        });
        const getData = await getRes.json();
        const visiteurs = getData.record.visiteurs || [];
        visiteurs.push(visitor);

        await fetch("https://api.jsonbin.io/v3/b/" + BIN_ID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY,
                "X-Access-Key": API_KEY
            },
            body: JSON.stringify({ visiteurs: visiteurs })
        });
    } catch(e) {
        console.log("Erreur tracker:", e);
    }
}

saveVisitor();

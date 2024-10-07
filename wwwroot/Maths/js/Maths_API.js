class Maths_API {
    static API_URL() { return "https://laboratoire-2-.glitch.me/api/Maths" };
    static async GetAide() {
        return new Promise(resolve => {
            $.ajax({
                url: this.API_URL() + "?",
                success: contacts => { resolve(contacts); },
                error: (xhr) => { console.log(xhr); resolve(null); }
            });
        });
    }
    static async GetCalculation(url1) {
        return new Promise(resolve => {
            $.ajax({
                url: url1,
                success: contacts => { resolve(contacts); },
                error: (xhr) => { console.log(xhr); resolve(null); }
            });
        });
    }
}
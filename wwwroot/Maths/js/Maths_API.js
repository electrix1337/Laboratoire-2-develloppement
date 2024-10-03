class Maths_API {
    static API_URL() { return "http://localhost:5000/api/Maths" };
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
        /*let str = "";
        if (valuse != null && values.length != 0) {
            values.foreach(item => {
                str += item
                if (first) {
                    first = false
                } else {
                    str += "&"
                }
            });
            str = str.slic(0, -1);
        }*/
        return new Promise(resolve => {
            $.ajax({
                url: url1,
                success: contacts => { resolve(contacts); },
                error: (xhr) => { console.log(xhr); resolve(null); }
            });
        });
    }
}
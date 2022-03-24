module.exports = {
    wordFrequency: function(doc, word){
        var textArray = this.stringToWordsArray(doc.content);
        var count = 0;

        textArray.forEach(element => {
            if(element.toLowerCase() == word.toLowerCase())
            count++;
        });
        return count;
    },

    wordSentences: function(doc, word){
        var sentencesArray = [];
        var strAux  ="";
        var start = false;

         for(i = 0 ; i< doc.content.length ; i++)
         {
            if(doc.content[i].match((/[A-Z]+/gm)) || start)
            {
                start  = true;
                strAux += doc.content[i];

                if(doc.content[i] == "." || doc.content[i] == ":" || doc.content[i] == ";" || doc.content[i] == "\n")
                {
                    if(strAux.toLowerCase().includes(word.toLowerCase()))
                        sentencesArray.push(strAux);

                    console.log(strAux)
                    strAux = "";
                    start = false;
                }
            }        
         }
         return sentencesArray;
    },

    topWords: function(doc, count, minWordLength){
        var textArray = this.stringToWordsArray(doc.content);
        var aux = 0;
        let objArray = [{"text": "", "count" : 0}];

       textArray.forEach(element => {
            if(element.length >= minWordLength && element != "")
            {
                textArray.forEach(element2 =>
                {
                    if(element.toLowerCase() == element2.toLowerCase())
                    {
                       aux ++;
                       textArray[textArray.indexOf(element2)] = "";
                    }

                    
                });
                    
                let obj = {"text": element, "count" : aux};
                objArray.push(obj);
                aux = 0;
            }
        });

        var resultArray = [];
        objArray.splice(0,1);
        var mFrequent = this.getMoreFrequentWord(objArray);

        //Caso o parametro count seja para filtrar como contagem mínima.
        while(mFrequent.count > 0 /*count*/|| objArray.length > 0)
        {
            resultArray.push(""+mFrequent.text+" - "+mFrequent.count+" ocorrência(s) no texto.\n");
            objArray.splice(objArray.indexOf(mFrequent),1);
            mFrequent = this.getMoreFrequentWord(objArray);
        }
        
        return resultArray;
    },

    stringToWordsArray: function(text) {
        return text.match(/[a-zÀ-ú]+/gmui);
    },

    getMoreFrequentWord: function(obj) {
        let mFrequent = {"text": "", "count" : 0};

        obj.forEach(element => {
            if(element.count > mFrequent.count)
            {
                mFrequent = element;
            }
        });
        return mFrequent;
    }
}


//Post request example version 2.0
var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://api.bls.gov/publicAPI/v2/timeseries/data/");
httpWebRequest.ContentType = "application/json";
httpWebRequest.Method = "POST";
//Using Javascript Serializer
using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream())){
  var code = new JavaScriptSerializer();
  var newJson = code.Serialize(new SeriesPost(){
      seriesid = (new List("CUUR0000SA0")).ToArray(),
      startyear = "",
      endyear = "",
      catalog = true,
      calculations = true,
      annualaverage = true,
      registrationKey = "EnterRegistrationKeyHere"
  });
  //View the JSON output
  System.Diagnostics.Debug.WriteLine(newJson);
  streamWriter.Write(newJson);
  streamWriter.Flush();
  streamWriter.Close();
};
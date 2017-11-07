// Axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// NYT API
const authKey = "f156a4373ec54a6d9edbe5f004ab0cdf";

// Helper functions
const helpers = {
  runQuery: (searchTerm) => {
    console.log("Search term passed into query: " + searchTerm);
    // NYTimes search query.
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchTerm;
    return axios.get(queryURL).then((response) => {
      console.log(response);

      if(response.data.response.docs[0]) {
      	return response.data.response.docs;
      } else {
      	return "";
      }
    });
  },


  // Get saved articles
  getSaved: () => {
  	return axios.get("/api/saved");
  },

  saveArticle: (articleTitle, articleDate, articleURL) => {

  	console.log("Article title to save in helper code: " + articleTitle);
  	console.log("Article date to save in helper code: " + articleDate);

  	return axios.post("/api/saved",
  		{
  			title: articleTitle,
  			date: articleDate,
        url: articleURL
  		}
  	);
  },


  deleteArticle: (articleID) => {

  	console.log("Article to delete in helper: " + articleID);

  	return axios.delete("/api/saved/" + articleID)

  	.then(res =>  {
  		console.log("Delete from axios: " + res);
  	})
  	.catch(err => {
  		console.log("Error: " + err);
  	});

  }

};
// Export the helpers function.
export default helpers;
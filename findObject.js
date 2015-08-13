
/**
 * [findObject Find if the object contains the value you are looking for]
 * @param  {[RegExp]}         search  [value you want search for]
 * @param  {[RegExp || void]} exclude [The path you want to exclude]
 * @return {[void]}                   []
 */
(function findObject(search,exclude) {
  var ind = 0,
      visited = {},
      ID = "frosmo_iterate_id",
      /** 
       * [iterate Iterate the object or the nested object until achieve the attribute, compares if 
       * the search(e.g product ID) matches the attribute value. If yes prints the path until the value and the parent 
       * object.
       * @param  {[object]}   obj    [Object you want to search(e.g window)]
       * @param  {[Integer]}  depth  [Starting depth of the object]
       * @param  {[String]}   path   [Object path]
       * @param  {[object]}   parent [Object parent]
       * @return {[void]}            []
       */
      iterate = function (obj, depth, path, parent) {
          if (depth > 20) return;
          
          if (typeof obj == "object" && obj !== null && !obj[ID]) {
              obj[ID] = ++ind; // Gives to each pbject an unique identifier 
              visited[obj[ID]] = obj;
              try {
                  parent = obj;
                  for (var attr in obj) {
                     if (attr != ID)
                      iterate(obj[attr], depth+1, path+'.'+attr, parent); // nested object will iterate until be an attribute
                  } 
              } catch (e) {
                // console.error("Exception thrown", e.stack);}  
              }    
          } else {
              var text = String(obj);
              if(exclude === undefined) // if the exclude is not passed as parameter 
                exclude = /NOEXCLUDEOPTIONS/;
              
              if (text.match(search) && !(path.match(exclude))) {
                //  console.log("Found:", path, "=", [text]);
                  console.log("Found:", path, "=", parent);
              }
          }
      };
  iterate(window, 0, "window", {});
  for (var i in  visited) {
      delete visited[i][ID];
  }
})(/productID/,/(top|document|sibling|parent|URI)/); 
{/* Short Description With Read More */}
export const getShortDescription = (description, length,isReadMore='') => {
    let shortDescription = description;
    if(description.length > length){
        shortDescription = description.substr(0, length) + "...";
    }
  return shortDescription;
};
{/* Image Exist Or Not Check */}
export const getImageUrl = (photo_url) => {
  if(photo_url == ''){
    return '/images/home-page/no_image.png';
  }
   var http = new XMLHttpRequest();
    http.open('HEAD', photo_url, false);
    http.send();
    if(http.status == 404){
        return '/images/home-page/no_image.png';
    }else{
        return photo_url;
    }
}
{/* formatDate */}
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

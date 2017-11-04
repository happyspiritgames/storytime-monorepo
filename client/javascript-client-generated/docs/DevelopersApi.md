# StoryTimeReaderApi.DevelopersApi

All URIs are relative to *https://virtserver.swaggerhub.com/Happy-Spirit-Games/StoryTimeReaderAPI/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getPublishedStory**](DevelopersApi.md#getPublishedStory) | **GET** /stories/{storyKey} | 
[**getStoryScene**](DevelopersApi.md#getStoryScene) | **GET** /stories/{storyKey}/scenes/{sceneKey} | 
[**ping**](DevelopersApi.md#ping) | **GET** /ping | pings the service
[**searchInventory**](DevelopersApi.md#searchInventory) | **GET** /stories | searches catalog of published stories or gets a list of recommendations


<a name="getPublishedStory"></a>
# **getPublishedStory**
> StorySummary getPublishedStory(storyKey)



Get published story for the given storyKey

### Example
```javascript
var StoryTimeReaderApi = require('story_time_reader_api');

var apiInstance = new StoryTimeReaderApi.DevelopersApi();

var storyKey = "storyKey_example"; // String | unique identifier of the story to retrieve


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getPublishedStory(storyKey, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **storyKey** | **String**| unique identifier of the story to retrieve | 

### Return type

[**StorySummary**](StorySummary.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="getStoryScene"></a>
# **getStoryScene**
> Scene getStoryScene(storyKey, sceneKey)



Gets a scene.

### Example
```javascript
var StoryTimeReaderApi = require('story_time_reader_api');

var apiInstance = new StoryTimeReaderApi.DevelopersApi();

var storyKey = "storyKey_example"; // String | story key

var sceneKey = "sceneKey_example"; // String | scene key


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getStoryScene(storyKey, sceneKey, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **storyKey** | **String**| story key | 
 **sceneKey** | **String**| scene key | 

### Return type

[**Scene**](Scene.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="ping"></a>
# **ping**
> Pong ping()

pings the service

Check for signs of life.

### Example
```javascript
var StoryTimeReaderApi = require('story_time_reader_api');

var apiInstance = new StoryTimeReaderApi.DevelopersApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.ping(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Pong**](Pong.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="searchInventory"></a>
# **searchInventory**
> [SearchResults] searchInventory(opts)

searches catalog of published stories or gets a list of recommendations

Finds a list of stories based on search criteria, or a short list of recommendations by default. 

### Example
```javascript
var StoryTimeReaderApi = require('story_time_reader_api');

var apiInstance = new StoryTimeReaderApi.DevelopersApi();

var opts = { 
  'match': "match_example" // String | --NOT IMPLEMENTED-- an optional search string for looking up stories. 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.searchInventory(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **match** | **String**| --NOT IMPLEMENTED-- an optional search string for looking up stories.  | [optional] 

### Return type

[**[SearchResults]**](SearchResults.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


<template>
<div>
    <v-file-input v-model="file" accept="image/*" label="File input" show-size></v-file-input>
    
    <v-btn @click="upload()" color="primary">Upload</v-btn>




    <v-btn @click="listAllFile()" color="warning">List All Files</v-btn>
    <!-- <div class="d-flex justify-space-around flex-wrap pt-5">
        <v-card  v-for="(item, index) in allFile" :key="index" max-width="344" class="mt-5">
            <v-row class="py-4 pl-4">
                <v-col class="shrink">
                    <v-img height="200" width="200" :src="item.downloadurl">
                    </v-img>
                </v-col>
                <v-col class="text-center">
                    <v-container class="pa-0">
                        <v-row>
                            <v-col>
                                <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn icon>
                                    <v-icon>mdi-share-variant</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-card>
    </div> -->
</div>
</template>

<script>
import {storageRef} from '~/plugins/firebaseConfig.js'
export default {
    data() {
        return {
            file: null,
            imageUrl: null,
            allFile: []
        }
    },
    methods: {
        upload() {
            // console.log('File: '+this.file.name);
            
            var uploadTask = 
            storageRef.child('images/' + this.file.name).put(this.file).then((snapshot) => {
                console.log('Uploaded1 a blob or file!');
            }).catch((error) => {
                console.log(error);
            })
            // imagesRef.put(this.file).then(function (snapshot) {
            //     console.log('Uploaded2 a blob or file!');
            // });
        },
        listAllFile() {
            // Create a reference under which you want to list
            var listRef = storageRef.child('images/');
            // Find all the prefixes and items.
            listRef.listAll().then((res) => {
                // res.prefixes.forEach(function (folderRef) {
                //     // All the prefixes under listRef.
                //     // You may call listAll() recursively on them.
                // });
                res.items.forEach((itemRef) => {
                    // console.log(itemRef);
                    console.log(itemRef.fullPath);
                    // All the items under listRef.
                    // Get the download URL
                    itemRef.getDownloadURL().then((url) => {
                        // Insert url into an <img> tag to "download"
                        console.log('URL: ' + url);
                        // ****** url for download *******
                        // url --> [ ,   ,   ,]
                        this.allFile.push({
                            fullPath: itemRef.fullPath,
                            downloadurl: url
                        })
                    }).catch((error) => {
                        console.log('error: ' + error);
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/object-not-found':
                                // File doesn't exist
                                break;
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;
                            case 'storage/unknown':
                                // Unknown error occurred, inspect the server response
                                break;
                        }
                    });
                });
                // console.log(' Out - res.items');
                console.log(this.allFile);
            }).catch(function (error) {
                // Uh-oh, an error occurred!
                console.log('Uh-oh, an error occurred!' + error);
            });
        }
    }
}
</script>

<style>
</style>
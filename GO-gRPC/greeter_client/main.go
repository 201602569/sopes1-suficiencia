/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// Package main implements a client for Greeter service.
package main

import (
	"context"

	"encoding/json"
	"net/http"
	"os"
	"time"

	"fmt"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	address = "localhost:50051"
)

type Person struct {
	Name         string `json:"name"`
	Location     string `json:"location"`
	Gender       string `json:"gender"`
	Age          int    `json:"age"`
	Vaccine_type string `json:"vaccine_type"`
	Origin       string `json:"origin"`
}

func hello(w http.ResponseWriter, req *http.Request) {

	fmt.Println("here")
	var p Person
	//fmt.Println(req)

	err := decodeJSONBody(w, req, &p)

	failOnError(err, "Failed to decode JSON body")

	r1 := Person{Name: p.Name, Location: p.Location, Age: p.Age, Vaccine_type: p.Vaccine_type, Gender: p.Gender, Origin: "GRPC"}

	out, err := json.Marshal(r1)
	failOnError(err, "Failed to jsonfy object")

	//datos, _ := ioutil.ReadAll(req.Body)

	cuerpo := string(out)
	fmt.Fprintf(w, cuerpo)
	fmt.Println(cuerpo)
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewGreeterClient(conn)

	// Contact the server and print out its response.
	name := cuerpo
	if len(os.Args) > 1 {
		name = os.Args[1]
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.SayHello(ctx, &pb.HelloRequest{Name: name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.GetMessage())
	json.NewEncoder(w).Encode("ok")
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func health(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode("run GRPC")
}

func decodeJSONBody(w http.ResponseWriter, r *http.Request, dst interface{}) error {

	r.Body = http.MaxBytesReader(w, r.Body, 1048576)

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	err := dec.Decode(&dst)
	return err
}

func main() {
	// Set up a connection to the server.
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", hello).Methods("POST")
	router.HandleFunc("/healthCheck", health).Methods("GET")
	fmt.Println("Hello, World!")
	http.ListenAndServe(":8090", router)
}

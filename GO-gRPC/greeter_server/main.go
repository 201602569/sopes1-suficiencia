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

// Package main implements a server for Greeter service.
package main

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"

	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
	"google.golang.org/grpc/examples/helloworld/helloworld"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	port = ":50051"
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	helloworld.UnimplementedGreeterServer
}

type personas struct {
	name         string `json:"name"`
	location     string `json:"location"`
	gender       string `json:"gender"`
	age          string `json:"age"`
	vaccine_type string `json:"vaccine_type"`
}

var ctx = context.Background()

func saveOnServer(req string) {
	fmt.Println("methood save infected")

	url := "http://34.66.140.125:3000/saveData"
	var jsonStr = []byte(string(req))
	res, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	res.Header.Set("X-Custom-Header", "myvalue")
	res.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(res)
	failOnError(err, "Failed to speak HTTP ")
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	log.Infof("response Body: %s", string(body))
	//url := "http://35.222.87.108:80/saveData"
	//var jsonStr = []byte(string(req))

	//res, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))

	clientOptions := options.Client().ApplyURI("mongodb://35.194.11.222:80")

	// Connect to MongoDB
	client2, err := mongo.Connect(context.TODO(), clientOptions)

	// Check the connection
	err = client2.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client2.Database("sopes").Collection("personas")

	var bdoc interface{}
	errb := bson.UnmarshalExtJSON([]byte(req), true, &bdoc)
	fmt.Println(errb)

	insertResult, err := collection.InsertOne(ctx, bdoc)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a single document: ", insertResult)
	if err != nil {
		log.Fatal(err)
	}
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	saveOnServer(in.GetName())
	return &pb.HelloReply{Message: "Hello "}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	fmt.Println("Hello from server")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

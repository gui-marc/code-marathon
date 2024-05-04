import requests
import os

BASE_URL = 'http://localhost:8080'

current_user = None

def clear():
    print('\n' * 2)
    pass

def app():
    option = ''

    while option != 'q':
        clear()
        
        if current_user is None:  
            print('-------------- Menu --------------')
            print('1 - Register')
            print('2 - Login')
            print('q - Quit')
            option = input('Chose an option: ')

            if option == '1':
                register()
            elif option == '2':
                login()
        else:
            print(f'-------------- Menu - "{current_user['name']}" --------------')
            print('-------------- Vehicles --------------')
            print('1 - Register Vehicle')
            print('2 - List Vehicles')
            print('-------------- Rides --------------')
            print('3 - Create Ride')
            print('4 - List Rides')
            print('5 - Join Ride')
            print('6 - Leave Ride')
            print('-------------- Reviews --------------')
            print('7 - Create Review')
            print('8 - List Reviews')
            print('q - Quit')
            option = input('Chose an option: ')
        
            print(option)
            match option:
                case '1':
                    create_vehicle()
                case '2':
                    list_vehicles()
                case '3':
                    create_voyage()
                case '4':
                    get_available_voyages()
                case '5':
                    break
                    # join_ride()
                case '6':
                    break
                    # leave_ride()
                case '7':
                    break
                    # create_review()
                case '8':
                    break
                    # list_reviews()
                case 'q':
                    break
                case _:
                    continue

def login():
    global current_user
    clear()
    ist_id = input('Enter your istId: ')

    try:
        headers = {'Authorization' : f'Bearer {ist_id}'}
        data = requests.post(f'{BASE_URL}/auth/login', headers=headers)
        current_user = data.json()
        print(f'User "{current_user['name']}" logged in successfully')
    except Exception as e:
        print('Failed to login user')


def register():
    global current_user
    clear()
    name = input('Enter your name: ')
    email = input('Enter your email: ')
    ist_id = input('Enter your istId: ')

    try:
        data = requests.post(f'{BASE_URL}/auth/register', json={'name': name, 'email': email, 'istId': ist_id})
        current_user = data.json()
        is_logged_in = True
    except Exception as e:
        print('Failed to register user')


def create_vehicle():
    clear()
    model = input('Enter the model of the vehicle: ')
    registration_number = input('Enter the registration number of the vehicle: ')
    year = input('Enter the year of the vehicle: ')
    seats = input('Enter the number of seats of the vehicle: ')

    owner_id = current_user['id']

    try:
        headers = {'Authorization' : f'Bearer {current_user['istId']}'}
        data = requests.post(f'{BASE_URL}/vehicle/create', json={'owner_id': owner_id, 'model': model, 'registration_number': registration_number, 'year': year, 'seats': seats}, headers=headers)
        print('Vehicle created successfully')
    except Exception as e:
        print('Failed to create vehicle')


def print_vehicle(vehicle):
    print(f'ID: {vehicle['id']}')
    print(f'Model: {vehicle['model']}')
    print(f'Registration Number: {vehicle['registration_number']}')
    print(f'Year: {vehicle['year']}')
    print(f'Seats: {vehicle['seats']}')

def list_vehicles():
    try:
        response = requests.get(f'{BASE_URL}/vehicles/users/me', headers={'Authorization' : f'Bearer {current_user['istId']}'})
        if response.status_code == 200:
            vehicles = response.json()
            
            if len(vehicles) == 0:
                print('No vehicles found')
                return

            for vehicle in vehicles:
                print_vehicle(vehicle)
                print('\n')
            input('Press enter to continue')
        else:
            print('Failed to fetch vehicles')
                
    except Exception as e:
        print('Failed to fetch vehicles')


def create_voyage():
		clear()
		vehicle_id = input('Enter the vehicle id: ')
		driver_id = current_user['id']
		from_location = input('Enter the from location: ')
		to_location = input('Enter the to location: ')
		seats = input('Enter the number of seats: ')
		distance = input('Enter the distance: ')

		try:
				data = requests.post(f'{BASE_URL}/voyage/create', json={'vehicle_id': vehicle_id, 'driver_id': driver_id, 'from': from_location, 'to': to_location, 'seats': seats, 'distance': distance})
		except Exception as e:
				print('Failed to create voyage')

def get_voyage(voyage_id):
    try:
        response = requests.get(f'{BASE_URL}/voyage/{voyage_id}')
        if response.status_code == 200:
            voyage = response.json()
            print(voyage)
        else:
            print('Failed to fetch voyage')
    except Exception as e:
        print('Failed to fetch voyage')

def get_user_voyages():
    try:
        response = requests.get(f'{BASE_URL}/voyage/user', headers={'Authorization': 'Bearer YOUR_TOKEN'})
        if response.status_code == 200:
            user_voyages = response.json()
            for voyage in user_voyages:
                print(voyage)
        else:
            print('Failed to fetch user voyages')
    except Exception as e:
        print('Failed to fetch user voyages')

def get_available_voyages():
    try:
        response = requests.get(f'{BASE_URL}/voyage/available')
    except Exception as e:
        print('Failed to fetch available voyages')				

app()
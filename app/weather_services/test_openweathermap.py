''' Test cases for the OpenWeatherMap web service '''
import unittest
from . import openWeatherMap

class TestOpenWeatherMap(unittest.TestCase):

    def test_fetch(self):
        ''' Simple working test '''
        res = openWeatherMap.fetch_weather()
        self.assertIsNotNone(res)    

    def test_format(self):
        ''' Test result format '''
        res = openWeatherMap.fetch_weather()
        print(res)
        self.assertIsNotNone(res['location'])
        self.assertIsNotNone(res['temperature'])
        self.assertIsNotNone(res['humidity'])
        self.assertIsNotNone(res['wind'])
        self.assertIsNotNone(res['cloud'])
        self.assertIsNotNone(res['pressure'])

if __name__ == '__main__':
    unittest.main()
    
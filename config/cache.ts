import { CacheConfig } from '@ioc:Adonis/Addons/Adonis5-Cache'

export default {
  recordTTL: 60000, // record ttl in ms,

  ttlUnits: 'ms', // time units for ttl record

  currentCacheStorage: 'in-memory', // storages which used as default cache storage

  enabledCacheStorages: ['in-memory'], // storages which will be loaded

  cacheKeyPrefix: 'cache_record_', // prefix for keys, which will be stored in cache storage

  enabledEvents: {
    'cache-record:read': false,
    'cache-record:written': false,
    'cache-record:missed': false,
    'cache-record:forgotten': false,
  },
} as CacheConfig
